import React,{useState, useEffect} from 'react'
import SelectLanguage from './SelectLanguage';
import './main.css';
const Main = () => {
    const [output, setOutput] = useState("");
    const [language, setLanguage] = useState([]);

useEffect(()=>{
getLanguages();
},[]);

async function getLanguages(){
    const url = 'https://text-translator2.p.rapidapi.com/getLanguages';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'c97f50abb2msh3616900d606885ep1f45aajsn0970ab5aca5d',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
        // const newResult = JSON.stringify(result)
        // console.log(JSON.parse(newResult).data);
        const newData = JSON.parse(result);
        // console.log(newData.data.languages);
        setLanguage(newData.data.languages);
    } catch (error) {
        alert("Limit exhausted");
    }

}







async function fetchData (selectedLanguage, translatedLanguage, inputValue){
    const url = 'https://text-translator2.p.rapidapi.com/translate';
    const options = {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'X-RapidAPI-Key': 'c97f50abb2msh3616900d606885ep1f45aajsn0970ab5aca5d',
            'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        body: new URLSearchParams({
            source_language: selectedLanguage,
            target_language: translatedLanguage,
            text: inputValue
        })
    };
    
    try {
        const response = await fetch(url, options);
        const result = await response.text();
       const newResult =JSON.parse(result);
       setOutput(newResult.data.translatedText);
    } catch (error) {
       alert("Limit exhausted");
    }
}

function formInput(e){
    e.preventDefault();

const selectedLanguage = e.target.children[0].value;
const translatedLanguage = e.target.children[1].value;
const inputValue = e.target.children[2].value;
fetchData(selectedLanguage, translatedLanguage, inputValue);
}

  return (
   <>
   <main className="main">
    <form action="" onSubmit={(e)=>formInput(e)}>
        <select name="Select Language" id="">
            <option value="" disabled="true">Select Your Language</option>
            
            {
                language.map((ele)=>(<SelectLanguage key={'sel'+ Math.floor(Math.random()*10000)} dataObj={ele}/>))
            }
        </select>
        <select name="Converted Language" id="">
            <option value="" disabled="true">
                Select Converted Language
            </option>
           
            {
                language.map((ele)=>(<SelectLanguage key={'trans'+ Math.floor(Math.random()*10000)} dataObj={ele}/>))
            }
        </select>
        <input type="text" />
        <button>Translate</button>
    </form>


<div className="output-container">
{output}
</div>

   </main>
   
   </>
  )
}

export default Main
