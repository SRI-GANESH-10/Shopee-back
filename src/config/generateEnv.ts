
export const isLocal = () =>{
    return process.env.MONGODB_URI?.includes('localhost') ? true : false;
}