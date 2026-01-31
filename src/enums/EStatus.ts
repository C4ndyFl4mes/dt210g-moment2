// "Enum" för status då enums inte fungerar pga "erasableSyntaxOnly": true
export const EStatus = {
    Pending: 0,
    Ongoing: 1,
    Completed: 2
} as const;