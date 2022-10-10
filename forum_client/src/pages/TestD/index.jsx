import Axios from "axios";
import FileDownload from "js-file-download"

function TestD(){
    const download=(e)=>{
        e.preventDefault()
        Axios({
            url:"http://localhost:8090/category/",
            method:"GET",
            responseType:"blob"

        }).then((res)=>{
            console.log(res);
            FileDownload(res.data,"sample.json")

        })
    };

    return(
        <div>
            <button onClick={(e)=> download(e)}>Download</button>
        </div>

    );
}

export default TestD;