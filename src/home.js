import './App.css';
import f1 from "./f1.png"
import f2 from "./f2.jpg"
import f3 from "./f3.png"
export function HomePg(){
    return(
        <div>
            <div className="home">
            <div className='header'>
                <h2>Discover Every Flavor: Your Ultimate Recipe Destination</h2>
            </div>
            <div className='features'>
            </div>
            </div>
           <div className='home_content'>
             <ul>
                <li>
                    <span>Discover recipes! All on one platform</span>
                    <img src={f1} alt="f1"/>
                </li>
                <li>
                    <span>Endless Variety:<br/> Explore a vast collection of recipes from every cuisine, meal type, and dietary need.</span>
                    <img src={f2} alt="f1"/>
                </li>
                <li>
                    <span>Smart Filters:<br/> Easily find the perfect dish by filtering recipes based on ingredients, difficulty, cuisine, and more.</span>
                    <img src={f3} alt="f1"/>
                </li>
             </ul>
           </div>
        </div>
    )
}