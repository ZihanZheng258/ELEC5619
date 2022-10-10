import Axios from "axios";


function TestU(){
    state = {
        file: null
    }

    const handleFile(e)=>{
        let file = e.target.files[0]

        this.setState({file: file})
    }



    return(<div>
        <label>Select File</label>
        <input type = "file" name = "file" onChange={(e)=>this.handleFile(e)} />
    </div>

    )
}

export default TestU;