import React from "react";
import axios from "axios";
import './GamesAndBettes.css';

const GAME_ONE_ID='1';
const GAME_TWO_ID='2';
const GAME_THREE_ID='3';
const GAME_FOUR_ID='4';
const GAME_ONE_CASE=1;
const GAME_TWO_CASE=2;
const GAME_THREE_CASE=3;
const GAME_FOUR_CASE=4;
const ALL_GAME_NUMBER=4;
const GAME_TIME=30000;
const UPDATE_TIME=3000;
const START_NULL_VALUE=-1;
const START_DEAFULT_BET='?';
const START_DEAFULT_GOALLES=0;
const START_DEAFULT_BALANCE=0;
const START_DEAFULT_CYCLE=1;
const NUMBER_AFTER_POINT=2;
const HOME_TEAM_INDEX=0;
const HOME_TEAM_BET_RATIO_INDEX=1;
const GUEST_TEAM_INDEX=2;
const GUEST_TEAM_BET_RATIO_INDEX=3;
const DRAW_BET_RATIO_INDEX=4;
const BET_VALUE_INDEX=5;
const DID_USER_BET_ON_THIS_GAME_INDEX=6;
const HOME_GOALLES_NUMBER_INDEX=7;
const GUST_GOALLES_NUMBER_INDEX=8;
const HOME_BET_CHOSE='1';
const GUEST_BET_CHOSE='2';
const DRAW_BET_CHOSE='x';
const NO_ERRORS = 0;
const START_BET_VALUE = 0;







class GamesAndBettes extends React.Component {
    state = {
        gameBegine:false,
        cycleNumber:START_DEAFULT_CYCLE,
        gameEnding:false,
        betTime:true,
        user: {},
        minute:START_NULL_VALUE,
        id:START_NULL_VALUE,
        balance: START_DEAFULT_BALANCE,
        error1:"",
        betChar1:START_DEAFULT_BET,
        massageFromServer1:"",
        game1:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            START_BET_VALUE,  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            START_DEAFULT_GOALLES, // גולים מארחים
            START_DEAFULT_GOALLES // גולים אורחים
        ],

        massageFromServer2:"",
        error2:"",
        betChar2:START_DEAFULT_BET,
        game2:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            START_BET_VALUE,  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            START_DEAFULT_GOALLES, // גולים מארחים
            START_DEAFULT_GOALLES // גולים אורחים
        ],

        massageFromServer3:"",
        error3:"",
        betChar3:START_DEAFULT_BET,
        game3:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            START_BET_VALUE,  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            START_DEAFULT_GOALLES, // גולים מארחים
            START_DEAFULT_GOALLES // גולים אורחים
        ],

        massageFromServer4:"",
        error4:"",
        betChar4:START_DEAFULT_BET,
        game4:[
            "", // שם קבוצה 1
            "",  // יחס ניצחון קבוצה 1
            "", //  שם קבוצה 2
            "", //יחס ניצחון קבוצה 2
            "" , // יחס תיקו
            START_BET_VALUE,  // סכום הימור על משחק ראשון
            false ,// האם נעשה הימור על המשחק
            START_DEAFULT_GOALLES, // גולים מארחים
            START_DEAFULT_GOALLES ,// גולים אורחים
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
        gameTemp1[BET_VALUE_INDEX] = value;
        this.setState({
            game1:gameTemp1
        })
    }

    inputGame2Change=(event)=> {
        const value = event.target.value;
        const gameTemp2= this.state.game2
        gameTemp2[BET_VALUE_INDEX] = value;
        this.setState({
            game2:gameTemp2
        })
    }

    inputGame3Change=(event)=> {
        const value = event.target.value;
        const gameTemp3= this.state.game3
        gameTemp3[BET_VALUE_INDEX] = value;
        this.setState({
            game3:gameTemp3
        })
    }

    inputGame4Change=(event)=> {
        const value = event.target.value;
        const gameTemp4= this.state.game4
        gameTemp4[BET_VALUE_INDEX] = value;
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
                    balance: response.data.toFixed(NUMBER_AFTER_POINT)
                })
            });
    }


    //  משלים ע"פ הקבוצות בstate את פרטי ההימורים בינהם
    getBetDetails =(id)=>{
        if (id===GAME_ONE_ID){
            const game =this.state.game1;
            game[DID_USER_BET_ON_THIS_GAME_INDEX]=true;
            this.setState({
                game1:game
            })
        } else if (id===GAME_TWO_ID){
            const game =this.state.game2;
            game[DID_USER_BET_ON_THIS_GAME_INDEX]=true;
            this.setState({
                game2:game
            })
        } else if (id===GAME_THREE_ID){
            const game =this.state.game3;
            game[DID_USER_BET_ON_THIS_GAME_INDEX]=true;
            this.setState({
                game3:game
            })
        } else if (id===GAME_FOUR_ID){
            const game =this.state.game4;
            game[DID_USER_BET_ON_THIS_GAME_INDEX]=true;
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
debugger
                    const betHome1 = response.data.game1.betRatioHome.toFixed(NUMBER_AFTER_POINT);
                    const betGuest1 = response.data.game1.betRatioGuest.toFixed(NUMBER_AFTER_POINT);
                    const betDraw1 = response.data.game1.betRatioDraw.toFixed(NUMBER_AFTER_POINT);
                    const betHome2 = response.data.game2.betRatioHome.toFixed(NUMBER_AFTER_POINT);
                    const betGuest2 = response.data.game2.betRatioGuest.toFixed(NUMBER_AFTER_POINT);
                    const betDraw2 = response.data.game2.betRatioDraw.toFixed(NUMBER_AFTER_POINT);
                    const betHome3 = response.data.game3.betRatioHome.toFixed(NUMBER_AFTER_POINT);
                    const betGuest3 = response.data.game3.betRatioGuest.toFixed(NUMBER_AFTER_POINT);
                    const betDraw3 = response.data.game3.betRatioDraw.toFixed(NUMBER_AFTER_POINT);
                    const betHome4 = response.data.game4.betRatioHome.toFixed(NUMBER_AFTER_POINT);
                    const betGuest4 = response.data.game4.betRatioGuest.toFixed(NUMBER_AFTER_POINT);
                    const betDraw4 = response.data.game4.betRatioDraw.toFixed(NUMBER_AFTER_POINT);

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
                        massageFromServer1 = "Result is:  " + this.state.game1[HOME_TEAM_INDEX] +" : "+ homeGoalls1 + "   |   " + this.state.game1[GUEST_TEAM_INDEX] +" : "+ guestGoalls1;
                        massageFromServer2 = "Result is:  " + this.state.game2[HOME_TEAM_INDEX] +" : "+ homeGoalls2 + "   |   " + this.state.game2[GUEST_TEAM_INDEX] +" : "+ guestGoalls2;
                        massageFromServer3 = "Result is:  " + this.state.game3[HOME_TEAM_INDEX] +" : "+ homeGoalls3 + "   |   " + this.state.game3[GUEST_TEAM_INDEX]+" : " + guestGoalls3;
                        massageFromServer4 = "Result is:  " + this.state.game4[HOME_TEAM_INDEX] +" : "+ homeGoalls4 + "   |   " + this.state.game4[GUEST_TEAM_INDEX] +" : "+ guestGoalls4;
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

                    const game1=[home1,betHome1,guest1,betGuest1,betDraw1,this.state.game1[BET_VALUE_INDEX],this.state.game1[DID_USER_BET_ON_THIS_GAME_INDEX],homeGoalls1,guestGoalls1];
                    const game2=[home2,betHome2,guest2,betGuest2,betDraw2,this.state.game2[BET_VALUE_INDEX],this.state.game2[DID_USER_BET_ON_THIS_GAME_INDEX],"",homeGoalls2,guestGoalls2];
                    const game3=[home3,betHome3,guest3,betGuest3,betDraw3,this.state.game3[BET_VALUE_INDEX],this.state.game3[DID_USER_BET_ON_THIS_GAME_INDEX],"",homeGoalls3,guestGoalls3];
                    const game4=[home4,betHome4,guest4,betGuest4,betDraw4,this.state.game4[BET_VALUE_INDEX],this.state.game4[DID_USER_BET_ON_THIS_GAME_INDEX],"",homeGoalls4,guestGoalls4];


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
                }, UPDATE_TIME);
        }



    startGames = () => { // מחזיר ומזין בstate את הקבוצות
        debugger
        if (this.state.cycleNumber < ALL_GAME_NUMBER) {
            axios.get("http://localhost:9124/get_game_golles")
                .then((response) => {

                });
        }
    }



    startSeason = ()=> {
        debugger
            const interval = setInterval(() => {
                if (this.state.cycleNumber <= ALL_GAME_NUMBER) { //   בכל דקה יש 30 שניות להימור 30 שניות למשחק (שבזמן הזה אסור להמר)
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
                        game1[DID_USER_BET_ON_THIS_GAME_INDEX] = true;
                        game2[DID_USER_BET_ON_THIS_GAME_INDEX] = true;
                        game3[DID_USER_BET_ON_THIS_GAME_INDEX] = true;
                        game4[DID_USER_BET_ON_THIS_GAME_INDEX] = true;
                    } else {
                        game1[DID_USER_BET_ON_THIS_GAME_INDEX] = false;
                        game2[DID_USER_BET_ON_THIS_GAME_INDEX] = false;
                        game3[DID_USER_BET_ON_THIS_GAME_INDEX] = false;
                        game4[DID_USER_BET_ON_THIS_GAME_INDEX] = false;
                    }
                        this.setState({
                            game1: game1,
                            game2: game2,
                            game3: game3,
                            game4: game4
                        })
                    }
                },GAME_TIME);
    }

    sendBet =(gameId)=>{
        if (this.state.betTime) {
            let betChar;
            let betAmount;
            let error;
            let gameTemp;
            switch (gameId){
                case GAME_ONE_CASE:
                    betChar = this.state.betChar1;
                    betAmount=this.state.game1[BET_VALUE_INDEX];
                    gameTemp = this.state.game1;
                    break;
                case GAME_TWO_CASE:
                    betChar = this.state.betChar2;
                    betAmount=this.state.game2[BET_VALUE_INDEX];
                    gameTemp = this.state.game2;
                    break;
                case GAME_THREE_CASE:
                    betChar = this.state.betChar3;
                    betAmount=this.state.game3[BET_VALUE_INDEX];
                    gameTemp = this.state.game3;
                    break;
                case GAME_FOUR_CASE:
                    betChar = this.state.betChar4;
                    betAmount=this.state.game4[BET_VALUE_INDEX];
                    gameTemp = this.state.game4;
                    break;
            }
            gameTemp[DID_USER_BET_ON_THIS_GAME_INDEX] = true; // בוצע הימור על המשחק
            switch (gameId){
                case GAME_ONE_CASE:
                    this.setState({
                        game1: gameTemp,
                    })
                    break;
                case GAME_TWO_CASE:
                    this.setState({
                        game2: gameTemp,
                    })
                    break;
                case GAME_THREE_CASE:
                    this.setState({
                        game3: gameTemp,
                    })
                    break;
                case GAME_FOUR_CASE:
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
                if (response.data.errorCode > NO_ERRORS) {
                    switch (gameId) {
                        case GAME_ONE_CASE:
                            this.setState({
                                error1: "somthing wrong, Error Code: " + response.data.errorCode,

                            })
                            break;
                        case GAME_TWO_CASE:
                            this.setState({
                                error2: "somthing wrong, Error Code: " + response.data.errorCode
                            })
                            break;
                        case GAME_THREE_CASE:
                            this.setState({
                                error3: "somthing wrong, Error Code: " + response.data.errorCode
                            })
                            break;
                        case GAME_FOUR_CASE:
                            this.setState({
                                error4: "somthing wrong, Error Code: " + response.data.errorCode
                            })
                            break;
                    }
                }
                gameTemp[BET_VALUE_INDEX] = 0; // איפוס התוכן באינפוט
                gameTemp[DID_USER_BET_ON_THIS_GAME_INDEX] = false;

                switch (gameId){
                    case GAME_ONE_CASE:
                        this.setState({
                            game1: gameTemp,
                        })
                        break;
                    case GAME_TWO_CASE:
                        this.setState({
                            game2: gameTemp,
                        })
                        break;
                    case GAME_THREE_CASE:
                        this.setState({
                            game3: gameTemp,
                        })
                        break;
                    case GAME_FOUR_CASE:
                        this.setState({
                            game4: gameTemp,
                        })
                        break;
                }
                this.setState({
                    balance: response.data.balance.toFixed(NUMBER_AFTER_POINT),
                })
            });
        }
    }




    render() {
        return (
            <div>
                <div id={"balance"}>
                    balance:
                    {this.state.balance}
                    <br/>
                        cycle number:
                        {this.state.cycleNumber}
                </div>
                <button disabled={this.state.game1[DID_USER_BET_ON_THIS_GAME_INDEX]} onClick={()=>{this.getBetDetails(GAME_ONE_ID)}}> {this.state.game1[HOME_TEAM_INDEX]} vs {this.state.game1[GUEST_TEAM_INDEX]} </button>
                     <br/>

                <div>
                    <button style={this.state.betChar1===HOME_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(HOME_BET_CHOSE,GAME_ONE_ID)
                    }}>
                        1: {this.state.game1[HOME_TEAM_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar1===DRAW_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(DRAW_BET_CHOSE,GAME_ONE_ID)
                    }}>
                        x: {this.state.game1[DRAW_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar1===GUEST_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(GUEST_BET_CHOSE,GAME_ONE_ID)
                    }}>
                        2: {this.state.game1[GUEST_TEAM_BET_RATIO_INDEX]}
                    </button>

                </div>
                <input  disabled={this.state.betChar1===START_DEAFULT_BET} onChange={this.inputGame1Change}/>
                <div>
                    <button disabled={this.state.game1[DID_USER_BET_ON_THIS_GAME_INDEX] || !this.state.betTime} onClick={() => {
                        this.sendBet(GAME_ONE_CASE)
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

                <button disabled={this.state.game2[DID_USER_BET_ON_THIS_GAME_INDEX]} onClick={()=>{this.getBetDetails(GAME_TWO_ID)}}> {this.state.game2[HOME_TEAM_INDEX]} vs {this.state.game2[GUEST_TEAM_INDEX]} </button>
                <br/>

                <div>
                    <button style={this.state.betChar2===HOME_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(HOME_BET_CHOSE,GAME_TWO_ID)
                    }}>
                        1: {this.state.game2[HOME_TEAM_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar2===DRAW_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(DRAW_BET_CHOSE,GAME_TWO_ID)
                    }}>
                        x: {this.state.game2[DRAW_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar2===GUEST_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(GUEST_BET_CHOSE,GAME_TWO_ID)
                    }}>
                        2: {this.state.game2[GUEST_TEAM_BET_RATIO_INDEX]}
                    </button>

                </div>
                <input  disabled={this.state.betChar2===START_DEAFULT_BET} onChange={this.inputGame2Change}/>
                <div>
                    <button disabled={this.state.game2[DID_USER_BET_ON_THIS_GAME_INDEX] || !this.state.betTime} onClick={() => {
                        this.sendBet(GAME_TWO_CASE)
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

                <button disabled={this.state.game3[DID_USER_BET_ON_THIS_GAME_INDEX]} onClick={()=>{this.getBetDetails(GAME_THREE_ID)}}> {this.state.game3[HOME_TEAM_INDEX]} vs {this.state.game3[GUEST_TEAM_INDEX]} </button>
                <br/>

                <div>
                    <button style={this.state.betChar3==='1'?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar('1',GAME_THREE_ID)
                    }}>
                        1: {this.state.game3[HOME_TEAM_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar3===DRAW_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(DRAW_BET_CHOSE,GAME_THREE_ID)
                    }}>
                        x: {this.state.game3[DRAW_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar3===GUEST_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(GUEST_BET_CHOSE,GAME_THREE_ID)
                    }}>
                        2: {this.state.game3[GUEST_TEAM_BET_RATIO_INDEX]}
                    </button>

                </div>
                <input  disabled={this.state.betChar3==='?'} onChange={this.inputGame3Change}/>
                <div>
                    <button disabled={this.state.game3[DID_USER_BET_ON_THIS_GAME_INDEX] || !this.state.betTime} onClick={() => {
                        this.sendBet(GAME_THREE_CASE)
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

                <button disabled={this.state.game4[DID_USER_BET_ON_THIS_GAME_INDEX]} onClick={()=>{this.getBetDetails(GAME_FOUR_ID)}}> {this.state.game4[HOME_TEAM_INDEX]} vs {this.state.game4[GUEST_TEAM_INDEX]} </button>
                <br/>

                <div>
                    <button style={this.state.betChar4===HOME_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(HOME_BET_CHOSE,GAME_FOUR_ID)
                    }}>
                        1: {this.state.game4[HOME_TEAM_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar4===DRAW_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(DRAW_BET_CHOSE,GAME_FOUR_ID)
                    }}>
                        x: {this.state.game4[DRAW_BET_RATIO_INDEX]}
                    </button>

                    <button style={this.state.betChar4===GUEST_BET_CHOSE?{color:"lightgreen"}:null} onClick={() => {
                        this.updateGuestChar(GUEST_BET_CHOSE,GAME_FOUR_ID)
                    }}>
                        2: {this.state.game4[GUEST_TEAM_BET_RATIO_INDEX]}
                    </button>

                </div>
                <input  disabled={this.state.betChar4===START_DEAFULT_BET} onChange={this.inputGame4Change}/>
                <div>
                    <button disabled={this.state.game4[DID_USER_BET_ON_THIS_GAME_INDEX] || !this.state.betTime } onClick={() => {
                        this.sendBet(DRAW_BET_RATIO_INDEX)
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