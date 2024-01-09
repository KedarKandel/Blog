import { useParams } from "react-router-dom"


type Props = {}

const Blog = (props: Props) => {
  const {id} = useParams()

  return (
    <div>{`this is blog ${id}`}</div>
  )
}

export default Blog