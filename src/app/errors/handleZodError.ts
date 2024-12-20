import { ZodError, ZodIssue } from "zod";
import { TErrorSources } from "../interface/error";


const handleZodErro=(err:ZodError)=>{
    const errorSources:TErrorSources=err.issues.map((
        issue:ZodIssue)=>{
            return{
                path:issue?.path[issue.path.length-1],
                message:issue.message,
            }
        
    });
    const statusCode=400;
    return{
        statusCode,
        message:'validation Error',
        errorSources
    }
}
export default handleZodErro