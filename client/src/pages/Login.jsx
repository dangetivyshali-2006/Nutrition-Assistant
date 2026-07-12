import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginBg from "../assets/login.png";


function Login() {

  const navigate = useNavigate();


  const [user, setUser] = useState({

    email: "",
    password: ""

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

  const handleLogin = async (e) => {

    e.preventDefault();


    if (user.email === "" || user.password === "") {

      alert("Please enter email and password");

      return;

    }



    try {

      setLoading(true);



      const response = await axios.post(

        "http://localhost:5000/api/auth/login",

        {

          email: user.email,

          password: user.password

        }

      );



      console.log("Login Response:", response.data);



      localStorage.setItem(

        "token",

        response.data.token || "login_token"

      );



      localStorage.setItem(

        "user",

        JSON.stringify(response.data.user)

      );



      alert("Login Successful");


      navigate("/dashboard");



    } catch (error) {


      console.log("Login Error:", error);



      if (error.response) {


        alert(

          error.response.data.message ||

          "Invalid login details"

        );


      } else {


        alert(

          "Cannot connect to server"

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
        User Login
      </h2>



      <form onSubmit={handleLogin}>


        <input

          type="email"

          name="email"

          placeholder="Email"

          value={user.email}

          onChange={handleChange}
          onKeyDown={handleEnter}

          required

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

          required

          style={{

            width: "100%",

            padding: "10px"

          }}

        />



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

            ? "Logging in..."

            : "Login"

          }


        </button>



      </form>



      <br />



      <button

        onClick={() => navigate("/")}

        style={{

          padding: "10px 20px",

          cursor: "pointer"

        }}

      >

        Create New Account

      </button>


</div>
    </div>

  );

}


export default Login;