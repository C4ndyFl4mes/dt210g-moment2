import * as Yup from "yup";
import type { IError } from "../interfaces/IError";
import type { ITodo } from "../interfaces/ITodo";

// Klass för validering av todo-formulärdata.
export class ValidationForm {

    // Definiera valideringsschema med Yup.
    static schema = Yup.object({
        title: Yup.string().required("Title is required.").min(3, "Title must be at least three letters long.").max(40, "Title cannot be longer than 40 letters."),
        description: Yup.string().notRequired().max(200, "Description cannot be longer than 200 letters."),
        status: Yup.number().required().integer().min(0).max(2)
    });

    // Asynkron metod för att validera en todo-post.
    static async validate(localTodo: ITodo): Promise<IError> {
        try {
            await this.schema.validate(localTodo, { abortEarly: false });

            return {};
        } catch (errors) {
            const validationErrors: IError = {};

            if (errors instanceof Yup.ValidationError) {
                errors.inner.forEach(error => {
                    const prop = error.path as keyof IError;

                    validationErrors[prop] = error.message;
                });

                return validationErrors;
            }

            return {};
        }
    }
}