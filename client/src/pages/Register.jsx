import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import loginBg from "../assets/login.png";

function Register() {

  const navigate = useNavigate();


  const [user, setUser] = useState({

    name: "",
    email: "",
    password: "",
    age: "",
    goal: ""

  });


  const [loading, setLoading] = useState(false);



  const handleChange = (e) => {

    setUser({

      ...user,

      [e.target.name]: e.target.value

    });

  };
  const handleEnter = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    const form = e.target.form;
    const index = Array.prototype.indexOf.call(form.elements, e.target);

    if (index < form.elements.length - 1) {
      form.elements[index + 1].focus();
    }
  }
};



  const handleRegister = async (e) => {

    e.preventDefault();



    if (

      !user.name ||

      !user.email ||

      !user.password ||

      !user.age ||

      !user.goal

    ) {

      alert("Please fill all fields");

      return;

    }



    try {


      setLoading(true);



      const response = await API.post(

        "/api/users/register",

        user

      );



      alert(

        response.data.message ||

        "Registration Successful"

      );



      setUser({

        name: "",

        email: "",

        password: "",

        age: "",

        goal: ""

      });



      navigate("/login");



    } catch (error) {


      console.log(

        "Registration Error:",

        error

      );



      if (error.response) {


        alert(

          error.response.data.message ||

          "Registration Failed"

        );


      } else {


        alert(

          "Server is not running"

        );


      }



    } finally {


      setLoading(false);


    }


  };



  return (

    <div
  style={{
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${loginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
  >
<div
  

      style={{

        width: "350px",

        margin: "50px auto",

        padding: "25px",

        border: "1px solid #ccc",

        borderRadius: "10px",

        fontFamily: "Arial"

      }}

    >


      <h2>
        User Registration
      </h2>



      <form onSubmit={handleRegister}>


        <input

          type="text"

          name="name"

          placeholder="Full Name"

          value={user.name}

          onChange={handleChange}
          onKeyDown={handleEnter}

          style={{

            width: "100%",

            padding: "10px"

          }}

        />



        <br /><br />



        <input

          type="email"

          name="email"

          placeholder="Email"

          value={user.email}

          onChange={handleChange}
          onKeyDown={handleEnter}

          style={{

            width: "100%",

            padding: "10px"

          }}

        />



        <br /><br />



        <input

          type="password"

          name="password"

          placeholder="Password"

          value={user.password}

          onChange={handleChange}
          onKeyDown={handleEnter}

          style={{

            width: "100%",

            padding: "10px"

          }}

        />



        <br /><br />



        <input

          type="number"

          name="age"

          placeholder="Age"

          value={user.age}

          onChange={handleChange}
          onKeyDown={handleEnter}

          style={{

            width: "100%",

            padding: "10px"

          }}

        />



        <br /><br />



        <select

          name="goal"

          value={user.goal}

          onChange={handleChange}
          onKeyDown={handleEnter}

          style={{

            width: "100%",

            padding: "10px"

          }}

        >


          <option value="">

            Select Your Goal

          </option>


          <option value="Weight Loss">

            Weight Loss

          </option>


          <option value="Weight Gain">

            Weight Gain

          </option>


          <option value="Fitness">

            Fitness

          </option>


          <option value="Healthy Diet">

            Healthy Diet

          </option>


        </select>



        <br /><br />



        <button

          type="submit"

          disabled={loading}

          style={{

            padding: "10px 20px",

            cursor: "pointer"

          }}

        >

          {

            loading

            ? "Registering..."

            : "Register"

          }


        </button>



      </form>



      <br />



      <button

        onClick={() => navigate("/login")}

        style={{

          padding: "10px 20px",

          cursor: "pointer"

        }}

      >

        Already have an account? Login

      </button>

</div>

    </div>

  );

}


export default Register;