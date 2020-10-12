export interface TestTree {
    value: string | number,
    name: {he: string | number, en: string | number},
    children?: TestTree[]
}
