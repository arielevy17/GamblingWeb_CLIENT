import React from "react";
import axios from "axios";
import './GamesAndBettes.css';

const GAME_ONE_ID='1';
const GAME_TWO_ID='2';
const GAME_THREE_ID='3';
const GAME_FOUR_ID='4';


class GamesAndBettes extends React.Component {
    state = {
        gameBegine:false,
        cycleNumber:1,
        gameEnding:false,
        betTime:true,
        user: {},
        minute:-1,
        id:-1,
        balance: -1,
        error1:"",
        betChar1:'?',
        CycleIsOver:0,
        massageFromServer1:"",
        game1:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            '',  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            0, // גולים מארחים
            0 // גולים אורחים
        ],

        massageFromServer2:"",
        error2:"",
        betChar2:'?',
        game2:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            '',  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            0, // גולים מארחים
            0 // גולים אורחים
        ],

        massageFromServer3:"",
        error3:"",
        betChar3:'?',
        game3:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            '',  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            0, // גולים מארחים
            0 // גולים אורחים
        ],

        massageFromServer4:"",
        error4:"",
        betChar4:'?',
        game4:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            '',  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            0, // גולים מארחים
            0 ,// גולים אורחים
        ],
    }

    componentDidMount() {
    this.getUserId();
    this.getUserBalance();
    this.getSeasonGame();
    // this.startSeason();
    }

    inputGame1Change=(event)=> {
        debugger
        const value = event.target.value;
        const gameTemp1= this.state.game1
        gameTemp1[5] = value;
        this.setState({
            game1:gameTemp1
        })
    }

    inputGame2Change=(event)=> {
        const value = event.target.value;
        const gameTemp2= this.state.game2
        gameTemp2[5] = value;
        this.setState({
            game2:gameTemp2
        })
    }

    inputGame3Change=(event)=> {
        const value = event.target.value;
        const gameTemp3= this.state.game3
        gameTemp3[5] = value;
        this.setState({
            game3:gameTemp3
        })
    }

    inputGame4Change=(event)=> {
        const value = event.target.value;
        const gameTemp4= this.state.game4
        gameTemp4[5] = value;
        this.setState({
            game4:gameTemp4
        })
    }

    getUserId = () => {
        debugger
        axios.get("http://localhost:9124/get_id_for_user")
            .then((response) => {
                this.setState({
                    user:response.data,
                    id: response.data.id
                })
            });
    }

    updateGuestChar = (char,id)=>{
        if(id===GAME_ONE_ID) {
            this.setState({
                betChar1: char
            })
        } else if(id===GAME_TWO_ID) {
            this.setState({
                betChar2: char
            })
        } else if(id===GAME_THREE_ID) {
            this.setState({
                betChar3: char
            })
        } else if(id===GAME_FOUR_ID) {
            this.setState({
                betChar4: char
            })
        }
    }

    checkIfGameWasStart = () =>{ // בדיקה האם המשחק החל
        axios.get("http://localhost:9124/is_game_start")
            .then((response) => {
                this.setState({
                    gameBegine: response.data
                })
            });
    }

    getUserBalance = () => {
        debugger
        axios.get("http://localhost:9124/get_balance_for_user")
            .then((response) => {
                this.setState({
                    balance: response.data.toFixed(2)
                })
            });
    }


    //  משלים ע"פ הקבוצות בstate את פרטי ההימורים בינהם
    getBetDetails =(id)=>{
        if (id==='1'){
            const game =this.state.game1;
            game[6]=true; //***
            this.setState({
                game1:game
            })
        } else if (id==='2'){
            const game =this.state.game2;
            game[6]=true; //***
            this.setState({
                game2:game
            })
        } else if (id==='3'){
            const game =this.state.game3;
            game[6]=true; //***
            this.setState({
                game3:game
            })
        } else if (id==='4'){
            const game =this.state.game4;
            game[6]=true; //***
            this.setState({
                game4:game
            })
        }
    }
    getSeasonGame = () => { // מחזיר ומזין בstate את הקבוצות
        debugger
        const interval = setInterval(() => {
            axios.get("http://localhost:9124/get_season_games")
                .then((response) => {

                    const betHome1 = response.data.game1.betRatioHome.toFixed(2);
                    const betGuest1 = response.data.game1.betRatioGuest.toFixed(2);
                    const betDraw1 = response.data.game1.betRatioDraw.toFixed(2);
                    const betHome2 = response.data.game2.betRatioHome.toFixed(2);
                    const betGuest2 = response.data.game2.betRatioGuest.toFixed(2);
                    const betDraw2 = response.data.game2.betRatioDraw.toFixed(2);
                    const betHome3 = response.data.game3.betRatioHome.toFixed(2);
                    const betGuest3 = response.data.game3.betRatioGuest.toFixed(2);
                    const betDraw3 = response.data.game3.betRatioDraw.toFixed(2);
                    const betHome4 = response.data.game4.betRatioHome.toFixed(2);
                    const betGuest4 = response.data.game4.betRatioGuest.toFixed(2);
                    const betDraw4 = response.data.game4.betRatioDraw.toFixed(2);

                    let homeGoalls1 = response.data.game1.homeGoalles;
                    let guestGoalls1 = response.data.game1.guestGoalles;
                    let homeGoalls2 = response.data.game2.homeGoalles;
                    let guestGoalls2 = response.data.game2.guestGoalles;
                    let homeGoalls3 = response.data.game3.homeGoalles;
                    let guestGoalls3 = response.data.game3.guestGoalles;
                    let homeGoalls4 = response.data.game4.homeGoalles;
                    let guestGoalls4 = response.data.game4.guestGoalles;


                    let gameCycle = response.data.cycleNumber;
                    let massageFromServer1= "";
                    let massageFromServer2= "";
                    let massageFromServer3= "";
                    let massageFromServer4= "";

                    if(response.data.game4.gameWasBegin && !response.data.game4.gameIsOver) {
                        massageFromServer1 = "Result is:  " + this.state.game1[0] +" : "+ homeGoalls1 + "   |   " + this.state.game1[2] +" : "+ guestGoalls1;
                        massageFromServer2 = "Result is:  " + this.state.game2[0] +" : "+ homeGoalls2 + "   |   " + this.state.game2[2] +" : "+ guestGoalls2;
                        massageFromServer3 = "Result is:  " + this.state.game3[0] +" : "+ homeGoalls3 + "   |   " + this.state.game3[2]+" : " + guestGoalls3;
                        massageFromServer4 = "Result is:  " + this.state.game4[0] +" : "+ homeGoalls4 + "   |   " + this.state.game4[2] +" : "+ guestGoalls4;
                    } else if(!response.data.game4.gameWasBegin && response.data.game4.gameIsOver) {
                        massageFromServer1 = this.state.massageFromServer1;
                        massageFromServer2 = this.state.massageFromServer2;
                        massageFromServer3 = this.state.massageFromServer3;
                        massageFromServer4 = this.state.massageFromServer4;
                   }

                    //  שמות קבוצות המעודכנות
                    const home1 = response.data.game1.home.name;
                    const guest1 = response.data.game1.guest.name;
                    const home2 = response.data.game2.home.name;
                    const guest2 = response.data.game2.guest.name;
                    const home3 = response.data.game3.home.name;
                    const guest3 = response.data.game3.guest.name;
                    const home4 = response.data.game4.home.name;
                    const guest4 = response.data.game4.guest.name;

                    const game1=[home1,betHome1,guest1,betGuest1,betDraw1,this.state.game1[5],this.state.game1[6],homeGoalls1,guestGoalls1];
                    const game2=[home2,betHome2,guest2,betGuest2,betDraw2,this.state.game2[5],this.state.game2[6],"",homeGoalls2,guestGoalls2];
                    const game3=[home3,betHome3,guest3,betGuest3,betDraw3,this.state.game3[5],this.state.game3[6],"",homeGoalls3,guestGoalls3];
                    const game4=[home4,betHome4,guest4,betGuest4,betDraw4,this.state.game4[5],this.state.game4[6],"",homeGoalls4,guestGoalls4];


                    this.setState({ // שליחת גולים למחזור הקודם
                        gameEnding: response.data.gameIsOver,
                        gameBegine: false,
                        cycleNumber:gameCycle,
                        massageFromServer1:massageFromServer1,
                        massageFromServer2:massageFromServer2,
                        massageFromServer3:massageFromServer3,
                        massageFromServer4:massageFromServer4,
                        game1: game1,
                        game2: game2,
                        game3: game3,
                        game4: game4
                    });
                });
                }, 3000);
        }



    startGames = () => { // מחזיר ומזין בstate את הקבוצות
        debugger
        if (this.state.cycleNumber < 4) {
            axios.get("http://localhost:9124/get_game_golles")
                .then((response) => {

                });
        }
    }



    startSeason = ()=> {
        debugger
            const interval = setInterval(() => {
                if (this.state.cycleNumber <= 4) { //   בכל דקה יש 30 שניות להימור 30 שניות למשחק (שבזמן הזה אסור להמר)
                    let betTime = !this.state.betTime;
                    this.setState({
                        betTime: betTime
                    })
                    const game1 = this.state.game1;
                    const game2 = this.state.game2;
                    const game3 = this.state.game3;
                    const game4 = this.state.game4;

                    if (!betTime) {
                        this.startGames();
                        //  חסימת אופציה להימורים נוספים
                        game1[6] = true;
                        game2[6] = true;
                        game3[6] = true;
                        game4[6] = true;
                    } else {
                        game1[6] = false;
                        game2[6] = false;
                        game3[6] = false;
                        game4[6] = false;
                    }
                        this.setState({
                            game1: game1,
                            game2: game2,
                            game3: game3,
                            game4: game4
                        })
                    }
                },30000);
    }

    sendBet =(gameId)=>{
        if (this.state.betTime) {
            let betChar;
            let betAmount;
            let error;
            let gameTemp;
            switch (gameId){
                case 1:
                    betChar = this.state.betChar1;
                    betAmount=this.state.game1[5];
                    gameTemp = this.state.game1;
                    break;
                case 2:
                    betChar = this.state.betChar2;
                    betAmount=this.state.game2[5];
                    gameTemp = this.state.game2;
                    break;
                case 3:
                    betChar = this.state.betChar3;
                    betAmount=this.state.game3[5];
                    gameTemp = this.state.game3;
                    break;
                case 4:
                    betChar = this.state.betChar4;
                    betAmount=this.state.game4[5];
                    gameTemp = this.state.game4;
                    break;
            }
            gameTemp[6] = true; // בוצע הימור על המשחק
            switch (gameId){
                case 1:
                    this.setState({
                        game1: gameTemp,
                    })
                    break;
                case 2:
                    this.setState({
                        game2: gameTemp,
                    })
                    break;
                case 3:
                    this.setState({
                        game3: gameTemp,
                    })
                    break;
                case 4:
                    this.setState({
                        game4: gameTemp,
                    })
                    break;
            }

            axios.post("http://localhost:9124/send_bet", null, {
                params: {
                    gameId: gameId,
                    betAmount: betAmount,
                    myGuess: betChar
                }
            }).then((response) => {
                debugger
                if (response.data.errorCode > 0) {
                    switch (gameId) {
                        case 1:
                            this.setState({
                                error1: "somthing wrong, Error Code: " + response.data.errorCode,

                            })
                            break;
                        case 2:
                            this.setState({
                                error2: "somthing wrong, Error Code: " + response.data.errorCode
                            })
                            break;
                        case 3:
                            this.setState({
                                error3: "somthing wrong, Error Code: " + response.data.errorCode
                            })
                            break;
                        case 4:
                            this.setState({
                                error4: "somthing wrong, Error Code: " + response.data.errorCode
                            })
                            break;
                    }
                }
                gameTemp[5] = " "; // איפוס התוכן באינפוט
                gameTemp[6] = false;

                switch (gameId){
                    case 1:
                        this.setState({
                            game1: gameTemp,
                        })
                        break;
                    case 2:
                        this.setState({
                            game2: gameTemp,
                        })
                        break;
                    case 3:
                        this.setState({
                            game3: gameTemp,
                        })
                        break;
                    case 4:
                        this.setState({
                            game4: gameTemp,
                        })
                        break;
                }
                this.setState({
                    balance: response.data.balance,
                })
            });
        }
    }




    render() {
        return (
            <div>
                <div id={"balance"}>
                    balance:
                    {this.state.balance.toFixed(2)}
                    <br/>
                        cycle number:
                        {this.state.cycleNumber}
                </div>
                <button disabled={this.state.game1[6]} onClick={()=>{this.getBetDetails(GAME_ONE_ID)}}> {this.state.game1[0]} vs {this.state.game1[2]} </button>
                     <br/>

                <div>
                    <button style={this.state.betChar1==='1'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('1',GAME_ONE_ID)
                    }}>
                        1: {this.state.game1[1]}
                    </button>

                    <button style={this.state.betChar1==='x'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('x',GAME_ONE_ID)
                    }}>
                        x: {this.state.game1[4]}
                    </button>

                    <button style={this.state.betChar1==='2'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('2',GAME_ONE_ID)
                    }}>
                        2: {this.state.game1[3]}
                    </button>

                </div>
                <input  disabled={this.state.betChar1==='?'} onChange={this.inputGame1Change}/>
                <div>
                    <button disabled={this.state.game1[6] || !this.state.betTime} onClick={() => {
                        this.sendBet(1)
                    }}>
                        Bet
                    </button>
                    {this.state.error1}
                    <br/>
                    {this.state.betTime? "make your bet" : "game is running"}
                    <br/>
                    {this.state.massageFromServer1}

                </div>

                {/*----  משחק 2  ----*/}

                <button disabled={this.state.game2[6]} onClick={()=>{this.getBetDetails(GAME_TWO_ID)}}> {this.state.game2[0]} vs {this.state.game2[2]} </button>
                <br/>

                <div>
                    <button style={this.state.betChar2==='1'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('1',GAME_TWO_ID)
                    }}>
                        1: {this.state.game2[1]}
                    </button>

                    <button style={this.state.betChar2==='x'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('x',GAME_TWO_ID)
                    }}>
                        x: {this.state.game2[4]}
                    </button>

                    <button style={this.state.betChar2==='2'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('2',GAME_TWO_ID)
                    }}>
                        2: {this.state.game2[3]}
                    </button>

                </div>
                <input  disabled={this.state.betChar2==='?'} onChange={this.inputGame2Change}/>
                <div>
                    <button disabled={this.state.game2[6] || !this.state.betTime} onClick={() => {
                        this.sendBet(2)
                    }}>
                        Bet
                    </button>
                    {this.state.error2}
                    <br/>
                    {this.state.betTime ? "make your bet" : "game is running"}
                    <br/>
                    {this.state.massageFromServer2}

                </div>

                {/*----  משחק 3 ----*/}

                <button disabled={this.state.game3[6]} onClick={()=>{this.getBetDetails(GAME_THREE_ID)}}> {this.state.game3[0]} vs {this.state.game3[2]} </button>
                <br/>

                <div>
                    <button style={this.state.betChar3==='1'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('1',GAME_THREE_ID)
                    }}>
                        1: {this.state.game3[1]}
                    </button>

                    <button style={this.state.betChar3==='x'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('x',GAME_THREE_ID)
                    }}>
                        x: {this.state.game3[4]}
                    </button>

                    <button style={this.state.betChar3==='2'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('2',GAME_THREE_ID)
                    }}>
                        2: {this.state.game3[3]}
                    </button>

                </div>
                <input  disabled={this.state.betChar3==='?'} onChange={this.inputGame3Change}/>
                <div>
                    <button disabled={this.state.game3[6] || !this.state.betTime} onClick={() => {
                        this.sendBet(3)
                    }}>
                        Bet
                    </button>
                    {this.state.error3}
                    <br/>
                    {this.state.betTime ? "make your bet" : "game is running"}
                    <br/>
                    {this.state.massageFromServer3}

                </div>

                {/*----  משחק 4  ----*/}

                <button disabled={this.state.game4[6]} onClick={()=>{this.getBetDetails(GAME_FOUR_ID)}}> {this.state.game4[0]} vs {this.state.game4[2]} </button>
                <br/>

                <div>
                    <button style={this.state.betChar4==='1'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('1',GAME_FOUR_ID)
                    }}>
                        1: {this.state.game4[1]}
                    </button>

                    <button style={this.state.betChar4==='x'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('x',GAME_FOUR_ID)
                    }}>
                        x: {this.state.game4[4]}
                    </button>

                    <button style={this.state.betChar4==='2'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('2',GAME_FOUR_ID)
                    }}>
                        2: {this.state.game4[3]}
                    </button>

                </div>
                <input  disabled={this.state.betChar4==='?'} onChange={this.inputGame4Change}/>
                <div>
                    <button disabled={this.state.game4[6] || !this.state.betTime } onClick={() => {
                        this.sendBet(4)
                    }}>
                        Bet
                    </button>
                    {this.state.error4}
                    <br/>
                    {this.state.betTime ? "make your bet" : "game is running"}
                    <br/>
                    {this.state.massageFromServer4}
                </div>
                <button style={{background:"green"}} onClick={()=>{this.startSeason()}}>
                   admin: start season
                </button>


            </div>
        );

    }
}

export default GamesAndBettes;