import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import logo from "../assets/logo copy.png";
import jsPDF from "jspdf";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function Dashboard() {


const navigate = useNavigate();


const user = JSON.parse(localStorage.getItem("user"));


// STATES

const [waterIntake,setWaterIntake] = useState(1000);

const [calories,setCalories] = useState(1500);

const [height,setHeight] = useState("");

const [weight,setWeight] = useState("");

const [bmi,setBmi] = useState(null);

const [bmiStatus,setBmiStatus] = useState("");

const [foodName,setFoodName] = useState("");

const [foodList,setFoodList] = useState([]);

const [time,setTime] = useState(new Date());



// Paste it HERE ↓↓↓

const quotes = [
  "Eat healthy, live healthy.",
  "Health is Wealth.",
  "Drink more water every day.",
  "Healthy food makes a healthy life.",
  "Take care of your body. It's the only place you have to live."
];
const quote = quotes[new Date().getDate() % quotes.length];
// CLOCK
useEffect(() => {
  const timer = setInterval(() => {
    setTime(new Date());
  }, 1000);

  return () => clearInterval(timer);
}, []);


const today=time.toLocaleDateString("en-IN",{

weekday:"long",

day:"numeric",

month:"long",

year:"numeric"

});


const currentTime=time.toLocaleTimeString();



const hour=time.getHours();


let greeting="Good Evening";


if(hour<12){

greeting="Good Morning";

}

else if(hour<17){

greeting="Good Afternoon";

}

// LOGOUT

const logout=()=>{

localStorage.removeItem("token");

localStorage.removeItem("user");

navigate("/login");

};



// FOOD CALORIE DATABASE

const foodCaloriesDB={

apple:95,

banana:105,

rice:130,

chapati:120,

dosa:168,

idli:58,

egg:78,

milk:103,

oats:150,

chicken:239,

paneer:265,

dal:116

};



// DIET PLAN

const dietPlan={

breakfast:"Idli + Sambar + Fruits",

lunch:"Rice + Dal + Vegetables",

dinner:"Chapati + Paneer + Salad",

snack:"Nuts + Milk"

};



// GOAL PERCENTAGE

const waterPercent=Math.min(
(waterIntake/3000)*100,
100
);


const caloriePercent=Math.min(
(calories/2200)*100,
100
);



// BADGE

let badge="🥉 Beginner";


if(waterPercent>=100 && caloriePercent>=100)

{

badge="🏆 Health Champion";

}

else if(waterPercent>=70)

{

badge="🥈 Healthy User";

}
  return (

<div
style={{
padding:"30px",
background:"#a8fca8",
minHeight:"100vh"
}}
>


{/* HEADER */}

<div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
background:"#ffffff",
padding:"20px",
borderRadius:"15px",
boxShadow:"0 5px 15px rgba(0,0,0,0.15)",
marginBottom:"25px"
}}
>


<div
style={{
display:"flex",
alignItems:"center",
gap:"20px"
}}
>


<img

src={logo}

alt="logo"

style={{

width:"80px",

height:"80px",

borderRadius:"50%"

}}

/>


<div>

<h1
style={{
color:"#2e7d32",
margin:0
}}
>
🥗 Nutrition Assistant
</h1>


<h3>
{greeting}, {user?.name} 👋
</h3>
<p
  style={{
    color: "#4caf50",
    fontStyle: "italic",
    marginTop: "10px"
  }}
>
  💚 {quote}
</p>

<p>
📅 {today}
</p>


<p
style={{
color:"#ff9800",
fontWeight:"bold"
}}
>
  
{badge}
</p>


<p>
⏰ {currentTime}
</p>


</div>


</div>



<button

onClick={logout}

style={{

background:"#d32f2f",

color:"#fff",

border:"none",

padding:"12px 25px",

borderRadius:"8px",

cursor:"pointer",

fontWeight:"bold"

}}

>

🚪 Logout

</button>


</div>





{/* CARDS */}


<div
style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",
gap:"20px"
}}
>



{/* WATER */}

<div
style={{
background:"#fff",
padding:"20px",
borderRadius:"15px",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",
textAlign:"center",
}}
>

<h2>💧 Water Intake</h2>


<div

style={{

width:"120px",

height:"120px",

borderRadius:"50%",

background:
`conic-gradient(#2196f3 ${waterPercent}%,#ddd 0%)`,

display:"flex",

alignItems:"center",

justifyContent:"center",

margin:"auto"

}}

>


<div

style={{

width:"90px",

height:"90px",

borderRadius:"50%",

background:"#fff",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",
display:"flex",

alignItems:"center",

justifyContent:"center",

fontWeight:"bold"

}}

>

{waterIntake} ml

</div>


</div>


<p>
{waterPercent.toFixed(0)}% Daily Goal
</p>


<button

onClick={()=>setWaterIntake(waterIntake+250)}

>

Add Water +250ml

</button>


</div>





{/* CALORIES */}


<div

style={{

background:"#fff",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",
padding:"20px",

borderRadius:"15px",

textAlign:"center",



}}

>


<h2>🔥 Calories</h2>


<h1>
{calories}
</h1>


<p>
/ 2200 kcal
</p>


<p>

Goal Completion:

<b>
 {caloriePercent.toFixed(0)}%

</b>

</p>


<button

onClick={()=>setCalories(calories+100)}

>

Add Calories +100

</button>


</div>





{/* HEALTH TIPS */}


<div

style={{

background:"#fff",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",
padding:"20px",

borderRadius:"15px",


}}

>


<h2>
🥗 Health Tips
</h2>


<p>

🥦 Eat colorful vegetables daily.

<br/>

🍎 Include seasonal fruits.

<br/>

💧 Drink 2-3 litres water.

<br/>

🚶 Walk 30 minutes every day.

</p>


</div>


</div>





{/* DIET PLAN */}


<div

style={{

background:"#fff",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",
marginTop:"25px",

padding:"20px",

borderRadius:"15px",


}}

>


<h2>
🍽 Today's Diet Plan
</h2>


<p>
🥣 <b>Breakfast:</b> {dietPlan.breakfast}
</p>


<p>
🍛 <b>Lunch:</b> {dietPlan.lunch}
</p>


<p>
🍽 <b>Dinner:</b> {dietPlan.dinner}
</p>


<p>
🥜 <b>Snack:</b> {dietPlan.snack}
</p>


</div>
{/* BMI CALCULATOR */}

<div
style={{
background:"#fff",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",

marginTop:"25px",
padding:"20px",
borderRadius:"15px",

}}
>

<h2>⚖️ BMI Calculator</h2>


<input
type="number"
placeholder="Height (cm)"
value={height}
onChange={(e)=>setHeight(e.target.value)}
style={{
padding:"10px",
margin:"5px"
}}
/>


<input
type="number"
placeholder="Weight (kg)"
value={weight}
onChange={(e)=>setWeight(e.target.value)}
style={{
padding:"10px",
margin:"5px"
}}
/>


<button

onClick={()=>{

if(!height || !weight){
alert("Please enter height and weight");
return;
}

const h = height / 100;

const result = (weight / (h*h)).toFixed(2);

setBmi(result);


if(result < 18.5)
{
setBmiStatus("Underweight");
}
else if(result < 25)
{
setBmiStatus("Normal");
}
else if(result < 30)
{
setBmiStatus("Overweight");
}
else
{
setBmiStatus("Obese");
}

}}
>
Calculate BMI
</button>


{
bmi &&
<p>
Your BMI: <b>{bmi}</b> ({bmiStatus})
</p>
}


</div>





{/* FOOD TRACKER */}


<div
style={{
background:"#fff",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",
marginTop:"25px",
padding:"20px",
borderRadius:"15px",
}}
>


<h2>🍎 Food Tracker</h2>


<input

placeholder="Enter food name"

value={foodName}

onChange={(e)=>setFoodName(e.target.value)}

style={{
padding:"10px"
}}

/>


<button

onClick={()=>{

const food=foodName.toLowerCase();

if(foodCaloriesDB[food]){

setFoodList([
...foodList,
{
name:food,
calories:foodCaloriesDB[food]
}
]);

setCalories(
calories+foodCaloriesDB[food]
);

}

setFoodName("");

}}

>

Add Food

</button>



{
foodList.map((item,index)=>(

<p key={index}>

🍽 {item.name} - {item.calories} kcal

</p>

))
}


</div>





{/* CHART */}


<div
style={{
background:"#fff",
border:"2px solid #66bb6a",
boxShadow:"0 6px 15px rgba(76,175,80,0.2)",
marginTop:"25px",
padding:"20px",
borderRadius:"15px"
}}
>


<h2>📊 Health Progress</h2>


<Bar

data={{

labels:["Water Intake","Calories"],

datasets:[{
  label:"Daily Progress",
  data:[waterIntake, calories],
  backgroundColor:[
    "#42a5f5",   // Blue for Water
    "#43a047"    // Green for Calories
  ],
  borderColor:[
    "#1e88e5",
    "#2e7d32"
  ],
  borderWidth:2,
  borderRadius:10
}]

}}

options={{

responsive:true,

plugins:{

legend:{
display:true
},

title:{

display:true,

text:"Nutrition Progress"

}

}

}}

/>


</div>





{/* PDF REPORT */}


<button

style={{
marginTop:"25px",
padding:"12px 25px",
background:"#e8f5e9",
color:"white",
border:"none",
borderRadius:"8px"
}}

onClick={()=>{

const doc=new jsPDF();


doc.text(
"Nutrition Assistant Report",
20,
20
);


doc.text(
`Water Intake: ${waterIntake} ml`,
20,
40
);


doc.text(
`Calories: ${calories}`,
20,
50
);


doc.text(
`BMI: ${bmi || "Not calculated"}`,
20,
60
);


doc.save("Nutrition_Report.pdf");


}}

>

📄 Download Report

</button>



</div>

  );

}


export default Dashboard;