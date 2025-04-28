import './App.css'
import {useState} from "react";
import TablePoints from './TablePoints';

function App() {

    // const canPoint = 1, plasticPoint = 2, glassPoint = 3;

    const [showEmail, setShowEmail] = useState(true)
    const [user, setUser] = useState({
        email: "",
        name: "",
        can: 0,
        plastic: 0,
        glass: 0,
        canPoints: 0,
        plasticPoints: 0,
        glassPoints: 0,
        totalPrevPoints: 0,
        totalPoints: 0
    })



    const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formEmail = formData.get("email") ?? "";

        fetch("https://recycling.shuplinoski.com/api/user/get-user/" + formEmail)
            .then(response => response.json())
            .then(data => {
                if (data.user === null) {
                    alert("User not found");
                    return
                }
                setUser(prevState => {
                    const newState = {...prevState} as any;
                    newState.email = data.user.email;
                    newState.name = data.user.name;
                    newState.totalPrevPoints = data.user.totalPoints;
                    setShowEmail(false);
                    return newState;
                })
            })
            .catch(error => console.error(error))
    }

    function addBottle(event: React.MouseEvent<HTMLButtonElement>): void {
        const name = event.currentTarget.name as "can" | "plastic" | "glass";
        if (name !== "can" && name !== "plastic" && name !== "glass") {
            console.error(`Invalid bottle type: ${name}`);
            return;
        }
        setUser(prevState => {
            const newState = {...prevState} as any;
            newState[name] = (newState[name] || 0) + 1;
            newState[`${name}Points`] = newState[name] * (name === "can" ? 1 : name === "plastic" ? 2 : 3);
            newState["totalPoints"] = newState.canPoints + newState.plasticPoints + newState.glassPoints;
            return newState;
        });
    }


    function savePoints(): void {
        console.log("Saving Points")
        fetch("https://recycling.shuplinoski.com/api/user/post-points", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: user.email,
                totalPoints: user.totalPoints + user.totalPrevPoints
            })
        })
            .then(response => response.json())
            .then(() => {
                setUser({
                    email: "",
                    name: "",
                    can: 0,
                    canPoints: 0,
                    plastic: 0,
                    plasticPoints: 0,
                    glass: 0,
                    glassPoints: 0,
                    totalPrevPoints: 0,
                    totalPoints: 0
                });
                setShowEmail(!showEmail);
                alert("Points saved");
            })
            .catch(error => console.error(error));

    }


    return (
        <>

            <h1><img src="./recycling.svg" alt="recycling-icon" height="40"/> Recycling bottles <img
                src="./recycling.svg" alt="recycling-icon" height="40"/></h1>
            <hr/>


            {showEmail && (
                <form onSubmit={handleForm}>
                    <input
                        type="text"
                        placeholder="Enter Email"
                        aria-label="Enter Email"
                        name="email"
                        style={{height: "30px", fontSize: "20px", width: "150px"}}
                    />
                    <button type="submit">OK</button>
                </form>
            )}

            {
                !showEmail &&
                (<div>
                        <h2>Welcome {user.name}</h2>
                        <TablePoints bottles={user} savePoints={savePoints} addBottle={addBottle}
                                     prevPoints={user.totalPrevPoints}/>
                    </div>
                )
            }
        </>
    )
}

export default App
