import Component1 from "./landing-page/Component1";
import Component2 from "./landing-page/Component2";
import Component3 from "./landing-page/Component3";
import ImageSlick from "./landing-page/ImageSlick";

const Home = () => {
  return (
    <div>
        <ImageSlick />
        <Component1 />
        <Component2 />
        <Component3 />
    </div>
  )
}

export default Home