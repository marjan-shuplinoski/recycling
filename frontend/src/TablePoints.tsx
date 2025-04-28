import Table from 'react-bootstrap/Table';
interface TablePointsProps {
    addBottle: (event: any) => void;
    savePoints: () => void;
    bottles: {
        can: number;
        plastic: number;
        glass: number;
        canPoints: number;
        plasticPoints: number;
        glassPoints: number;
        totalPoints: number;
    };
    prevPoints: number;
}

export default function TablePoints(props:TablePointsProps){
    return(
        <Table className={"bottlesTable"}>
            <thead>
            <tr className={"mb-12"}>
                <td></td>
                <td>
                    <button onClick={props.addBottle} name={"can"}><img src="./can.png" alt="can"
                                                                  height={150}/><br/>Can
                    </button>
                </td>
                <td>
                    <button onClick={props.addBottle} name={"plastic"}><img src="./plastic.jpg" alt="plastic"
                                                                      height={150}/><br/>Plastic
                    </button>
                </td>
                <td>
                    <button onClick={props.addBottle} name={"glass"}><img src="./glass.jpg" alt="glass"
                                                                    height={150}/><br/>Glass
                    </button>
                </td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td></td>
                <td>
                    <hr/>
                </td>
                <td>
                    <hr/>
                </td>
                <td>
                    <hr/>
                </td>
            </tr>
            <tr className={"mb-3"}>
                <td><h3>Points per Bottle:</h3></td>
                <td><h3>1</h3></td>
                <td><h3>2</h3></td>
                <td><h3>3</h3></td>
            </tr>
            <tr>
                <td><h3>Total Bottles:</h3></td>
                <td><h3>{props.bottles.can}</h3></td>
                <td><h3>{props.bottles.plastic}</h3></td>
                <td><h3>{props.bottles.glass}</h3></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <hr/>
                </td>
                <td>
                    <hr/>
                </td>
                <td>
                    <hr/>
                </td>
            </tr>
            <tr>
                <td><h3>Total Points(x Bottles):</h3></td>
                <td><h3>{props.bottles.canPoints}</h3></td>
                <td><h3>{props.bottles.plasticPoints}</h3></td>
                <td><h3>{props.bottles.glassPoints}</h3></td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <hr/>
                </td>
                <td>
                    <hr/>
                </td>
                <td>
                    <hr/>
                </td>
            </tr>
            <tr>
                <td><h2>Previous Points:</h2></td>
                <td className={"importantTD"}><h3>{props.prevPoints}</h3></td>
                <td><h2>Today Points:</h2></td>
                <td className={"importantTD"}><h3>{props.bottles.totalPoints}</h3></td>
            </tr>
            <tr><td><hr/></td><td><hr/></td><td><hr/></td><td><hr/></td></tr>
            <tr>
                <td><h2>Total Points:</h2></td>
                <td colSpan={2} className={"importantTD"}><h3>{props.bottles.totalPoints+props.prevPoints}</h3></td>
                <td>
                    <button onClick={props.savePoints} className={"importantTD"}>Save Points</button>
                </td>
            </tr>


            </tbody>
        </Table>

    )
}