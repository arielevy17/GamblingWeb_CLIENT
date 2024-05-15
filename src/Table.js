import React from "react";
import axios from "axios";

class Table extends React.Component {
    state ={
        teamsName:["",
               "",
               "",
               "",
               "",
               "",
               "",
               ""
            ],
        teamsPoint:["",
            "",
            "",
            "",
            "",
            "",
            "",
            ""
        ]
    }

    startTable = () => {
        axios.get("http://localhost:9124/get_season_games")
            .then((response) => {
                const firsPlaceName = response.data.arrangedTeamsByPoint[0].name;
                const firsPlacePoint = response.data.arrangedTeamsByPoint[0].point;
                const secondPlaceName = response.data.arrangedTeamsByPoint[1].name;
                const secondPlacePoint = response.data.arrangedTeamsByPoint[1].point;
                const thirdPlaceName = response.data.arrangedTeamsByPoint[2].name;
                const thirdPlacePoint = response.data.arrangedTeamsByPoint[2].point;
                const fourthPlaceName = response.data.arrangedTeamsByPoint[3].name;
                const fourthPlacePoint = response.data.arrangedTeamsByPoint[3].point;
                const fifthPlaceName = response.data.arrangedTeamsByPoint[4].name;
                const fifthPlacePoint = response.data.arrangedTeamsByPoint[4].point;
                const sixthPlaceName = response.data.arrangedTeamsByPoint[5].name;
                const sixthPlacePoint = response.data.arrangedTeamsByPoint[5].point;
                const seventhPlaceName = response.data.arrangedTeamsByPoint[6].name;
                const seventhPlacePoint = response.data.arrangedTeamsByPoint[6].point;
                const eighthPlaceName = response.data.arrangedTeamsByPoint[7].name;
                const eighthPlacePoint = response.data.arrangedTeamsByPoint[7].point;


                const tableName = this.state.teamsName;
                tableName[0] = firsPlaceName;
                tableName[1] = secondPlaceName;
                tableName[2] = thirdPlaceName;
                tableName[3] = fourthPlaceName;
                tableName[4] = fifthPlaceName;
                tableName[5] = sixthPlaceName;
                tableName[6] = seventhPlaceName;
                tableName[7] = eighthPlaceName;

                const tablePoint = this.state.teamsPoint;
                tablePoint[0] = firsPlacePoint;
                tablePoint[1] = secondPlacePoint;
                tablePoint[2] = thirdPlacePoint;
                tablePoint[3] = fourthPlacePoint;
                tablePoint[4] = fifthPlacePoint;
                tablePoint[5] = sixthPlacePoint;
                tablePoint[6] = seventhPlacePoint;
                tablePoint[7] = eighthPlacePoint;

                this.setState({
                    teamsName: tableName,
                    teamsPoint: tablePoint
                })
            })
    }

    getTable = () => {
        debugger
        const interval = setInterval(() => {
            axios.get("http://localhost:9124/get_season_games")
                .then((response) => {
                    const firsPlaceName = response.data.arrangedTeamsByPoint[0].name;
                    const firsPlacePoint = response.data.arrangedTeamsByPoint[0].point;
                    const secondPlaceName = response.data.arrangedTeamsByPoint[1].name;
                    const secondPlacePoint = response.data.arrangedTeamsByPoint[1].point;
                    const thirdPlaceName = response.data.arrangedTeamsByPoint[2].name;
                    const thirdPlacePoint = response.data.arrangedTeamsByPoint[2].point;
                    const fourthPlaceName = response.data.arrangedTeamsByPoint[3].name;
                    const fourthPlacePoint = response.data.arrangedTeamsByPoint[3].point;
                    const fifthPlaceName = response.data.arrangedTeamsByPoint[4].name;
                    const fifthPlacePoint = response.data.arrangedTeamsByPoint[4].point;
                    const sixthPlaceName = response.data.arrangedTeamsByPoint[5].name;
                    const sixthPlacePoint = response.data.arrangedTeamsByPoint[5].point;
                    const seventhPlaceName = response.data.arrangedTeamsByPoint[6].name;
                    const seventhPlacePoint = response.data.arrangedTeamsByPoint[6].point;
                    const eighthPlaceName = response.data.arrangedTeamsByPoint[7].name;
                    const eighthPlacePoint = response.data.arrangedTeamsByPoint[7].point;


                    const tableName = this.state.teamsName;
                    tableName[0] = firsPlaceName;
                    tableName[1] = secondPlaceName;
                    tableName[2] = thirdPlaceName;
                    tableName[3] = fourthPlaceName;
                    tableName[4] = fifthPlaceName;
                    tableName[5] = sixthPlaceName;
                    tableName[6] = seventhPlaceName;
                    tableName[7] = eighthPlaceName;

                    const tablePoint = this.state.teamsPoint;
                    tablePoint[0] = firsPlacePoint;
                    tablePoint[1] = secondPlacePoint;
                    tablePoint[2] = thirdPlacePoint;
                    tablePoint[3] = fourthPlacePoint;
                    tablePoint[4] = fifthPlacePoint;
                    tablePoint[5] = sixthPlacePoint;
                    tablePoint[6] = seventhPlacePoint;
                    tablePoint[7] = eighthPlacePoint;

                    this.setState({
                        teamsName: tableName,
                        teamsPoint: tablePoint
                    })
        })
        }, 31000);
    }

    componentDidMount() {
        this.startTable(); // רינדור ראשוני ע"מ לא להמתין את כל זמן האינטרוול בפעם הראשונה
        this.getTable();
    }


    render() {
        return(
            <div>
                Leage Table:
                <table>
                    <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{this.state.teamsName[0]}</td>
                        <td>{this.state.teamsPoint[0]}</td>
                    </tr>
                    <tr>
                        <td>{this.state.teamsName[1]}</td>
                        <td>{this.state.teamsPoint[1]}</td>
                    </tr>
                    <tr>
                        <td>{this.state.teamsName[2]}</td>
                        <td>{this.state.teamsPoint[2]}</td>
                    </tr>
                    <tr>
                        <td>{this.state.teamsName[3]}</td>
                        <td>{this.state.teamsPoint[3]}</td>
                    </tr>
                    <tr>
                        <td>{this.state.teamsName[4]}</td>
                        <td>{this.state.teamsPoint[4]}</td>
                    </tr>
                    <tr>
                        <td>{this.state.teamsName[5]}</td>
                        <td>{this.state.teamsPoint[5]}</td>
                    </tr>
                    <tr>
                        <td>{this.state.teamsName[6]}</td>
                        <td>{this.state.teamsPoint[6]}</td>
                    </tr>
                    <tr>
                        <td>{this.state.teamsName[7]}</td>
                        <td>{this.state.teamsPoint[7]}</td>
                    </tr>
                    </tbody>
                </table>

            </div>
        );
    }

}

export default Table;