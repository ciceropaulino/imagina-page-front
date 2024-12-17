
import ReactTypingEffect from 'react-typing-effect'
import Navbar from "../../components/Navbar";
import background from "../../assets/images/penguins_in_work.jpg";

const NotFound = () => {
  return (
    <div>
      <Navbar />

    <div 
      className="
        bg-center 
        bg-cover 
        bg-no-repeat 
        w-screen 
        h-screen 
        absolute 
        top-0 
        left-0 
        -z-10
      "
  style={{ backgroundImage: `url(${background})` }}
>

        {/* Contêiner para centralizar o texto */}

      <div 
      className="flex justify-center items-start h-screen pt-[90px] relative z-10 text-[#00aa00]
          text-2xl font-robotoMono">
         <ReactTypingEffect 
            text={["Work in progress.", "Come back later!"]}
            cursorRenderer={cursor => <h1>{"█"}</h1>}/>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


