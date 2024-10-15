import { useState } from "react"
import { useGetCategory } from "../hooks/queries"
import { useCreateCategory } from "../hooks/mutation"
const Index = () => {
    const [params] = useState({
        limit: 2,
        page: 1,
        search: ""
    })
    const { data } = useGetCategory(params).data || {}
    console.log(data, "data");
    const {mutate} = useCreateCategory()
    const create = async()=>{
        await mutate({name: "new Category"})
    }
    return (
        <div>
            <h1>Category</h1>
            <button onClick={create}>create</button>
        </div>
    )
}

export default Index
