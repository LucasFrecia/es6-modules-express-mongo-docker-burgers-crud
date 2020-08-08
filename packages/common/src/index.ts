/**
 * Common interfaces - models to be used by api and ui burger app
 */
export interface Item {
    _id: string | Blob;
    img: any;
    description: any;
    position: string | Blob;
}
export function html(x:string): string {
    console.log(arguments,"args")
    return x;
} 