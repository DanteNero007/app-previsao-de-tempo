import {useQuery} from "@tanstack/react-query"
import { getWeather } from "./api"

function App() {

const { data } = useQuery({
  queryKey: ['weather'],
  queryFn: () => getWeather({lat: 50, lon: 25})
})


  return (
    <>
   <div>{JSON.stringify(data)}</div>
    </>
  )
}

export default App


// styling - tailwindcss
//data fetching - tanstack query (React-Query)


