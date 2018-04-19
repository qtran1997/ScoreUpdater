$(document).ready(function(){
    var d = document.getElementById("calendar");
    var date = window.location.search;
    console.log(date.length);
    checkDate();
    var message= "";



    console.log("DATE:" + date);
    var url = "https://api.mysportsfeeds.com/v1.2/pull/nba/2017-playoff/scoreboard.json?fordate=" + date; 
    getScores();
    var gameBox = document.getElementsByClassName("game-box");
    var gamesOnDay = message.scoreboard.gameScore.length;



    updateGamesOnDay();



    changeName();
    centerBox();


    function centerBox()
    {
        gameBox = document.getElementsByClassName("game-box");
        document.getElementById("big-column").innerHTML = 
            `
<div id="logos">
</div>
`
            + gameBox[0].innerHTML;
        var color1 = changeLogo(0,1);
        var color2 = changeLogo(0,2);
        changeCenterColor(color1,color2);
    }

    function switchNum(i)
    {
        gameBox = document.getElementsByClassName("game-box");
        document.getElementById("big-column").innerHTML = 
            `
<div id="logos">
</div>
`
            + gameBox[i].innerHTML;
        var color1 = changeLogo(i,1);
        var color2 = changeLogo(i,2);
        changeCenterColor(color1,color2);
    }

    function changeName()
    {
        for(var i=0;i<gamesOnDay;i++)
        {        
            gameBox[i].getElementsByClassName("score1")[0].innerText = message.scoreboard.gameScore[i].homeScore; 
            gameBox[i].getElementsByClassName("score2")[0].innerText = message.scoreboard.gameScore[i].awayScore;

            gameBox[i].getElementsByClassName("team1")[0].innerText = message.scoreboard.gameScore[i].game.homeTeam.Name;
            gameBox[i].getElementsByClassName("team2")[0].innerText = message.scoreboard.gameScore[i].game.awayTeam.Name;
        }
    }

    function updateGamesOnDay()
    {
        gamesOnDay = message.scoreboard.gameScore.length;

        for(var i=0;i<gamesOnDay;i++)
        {
            document.getElementById("small-column").innerHTML += `

<div class="game-box">
<div class = "team-names">
<p class="team1"></p>
<p class="team2"></p>
</div>
<div class = "team-scores">
<p class="score1"></p>
<p class="hyphen">-</p>
<p class="score2"></p>
</div>

</div>




`;

        }
        for(var i=0;i<gamesOnDay;i++)
        {
            gameBox[i].addEventListener('click', switchNum.bind(null,i));
        }

        gameBox = document.getElementsByClassName("game-box");
    }

    function getScores()
    {
        $.ajax
        ({
            type: "GET",
            url: url,
            dataType: 'json',
            async: false,
            headers: {
                "Authorization": "Basic " + btoa("moose10" + ":" + "moose10")
            },
            success: function (msgObject){
                message = msgObject;
                console.log(message);

            },
            failure: function()
            {
                alert("NOOOOOOOOO");
            }
        });
    }

    function checkDate()
    {

        if(date.length == 0)
        {
            date = "2017-04-15";
            console.log(date);
            $("#calendar").attr('value', date);
            date = date.split("-");
            date = date.join('');
            console.log(date);
        }
        else
        {
            date = date.substr(date.length-10,date.length);
            console.log(date);
            $("#calendar").attr('value', date);
            date = date.split("-");
            date = date.join('');
            console.log(date);

        }
    }

    function changeLogo(index, num)
    {
        var color;
        var teamNumber = "team" + num;
        var teamNumberClass= ".team" + num + ":first";
        var team = gameBox[index].getElementsByClassName(teamNumber);
        if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Cavaliers")
        {
            color = '#6F263D';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/4/4b/Cleveland_Cavaliers_logo.svg/100px-Cleveland_Cavaliers_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');

            //            $('#team-logo1').html
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Celtics")
        {
            color = '#007A33';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Boston_Celtics.svg/200px-Boston_Celtics.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Nets")
        {
            color = '#000000';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Brooklyn_Nets_newlogo.svg/150px-Brooklyn_Nets_newlogo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Knicks")
        {
            color = '#003DA5';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/2/25/New_York_Knicks_logo.svg/200px-New_York_Knicks_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "76ers")
        {
            color = '#003DA5';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Philadelphia_76ers_logo.svg/200px-Philadelphia_76ers_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Raptors")
        {
            color = '#BA0C2F';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/3/36/Toronto_Raptors_logo.svg/200px-Toronto_Raptors_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Bulls")
        {
            color = '#BA0C2F';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/6/67/Chicago_Bulls_logo.svg/200px-Chicago_Bulls_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Pistons")
        {
            color = '#D50032';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Detroit_Pistons_logo.svg/200px-Detroit_Pistons_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Pacers")
        {
            color = '#041E42';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Indiana_Pacers.svg/200px-Indiana_Pacers.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Bucks")
        {
            color = '#00471B';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Milwaukee_Bucks_logo.svg/200px-Milwaukee_Bucks_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Hawks")
        {
            color = '#C8102E';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/2/24/Atlanta_Hawks_logo.svg/200px-Atlanta_Hawks_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Hornets")
        {
            color = '#00778B';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/c/c4/Charlotte_Hornets_%282014%29.svg/200px-Charlotte_Hornets_%282014%29.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Heat")
        {
            color = '#862633';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/f/fb/Miami_Heat_logo.svg/200px-Miami_Heat_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Magic")
        {
            color = '#0057B8';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/1/10/Orlando_Magic_logo.svg/200px-Orlando_Magic_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Wizards")
        {
            color = '#0C2340';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Washington_Wizards_logo.svg/200px-Washington_Wizards_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Nuggets")
        {
            color = '#041E42';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Denver_Nuggets.svg/200px-Denver_Nuggets.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Timberwolves")
        {
            color = '#002B5C';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/c/c2/Minnesota_Timberwolves_logo.svg/200px-Minnesota_Timberwolves_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Trail Blazers")
        {
            color = '#C8102E';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/2/21/Portland_Trail_Blazers_logo.svg/260px-Portland_Trail_Blazers_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
            $(teamNumberClass).css('font-size', '70px');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Jazz")
        {
            color = '#0C2340';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Utah_Jazz_logo_%282016%29.svg/200px-Utah_Jazz_logo_%282016%29.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Warriors")
        {
            color = '#FFC72C';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/0/01/Golden_State_Warriors_logo.svg/200px-Golden_State_Warriors_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Clippers")
        {
            color = '#003DA5';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/b/bb/Los_Angeles_Clippers_%282015%29.svg/200px-Los_Angeles_Clippers_%282015%29.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Lakers")
        {
            color = '#582C83';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Los_Angeles_Lakers_logo.svg/200px-Los_Angeles_Lakers_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Suns")
        {
            color = '#CB6015';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/d/dc/Phoenix_Suns_logo.svg/200px-Phoenix_Suns_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Kings")
        {
            color = '#582C83';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/c/c7/SacramentoKings.svg/200px-SacramentoKings.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Mavericks")
        {
            color = '#003DA5';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/9/97/Dallas_Mavericks_logo.svg/200px-Dallas_Mavericks_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Rockets")
        {
            color = '#CE1141';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/2/28/Houston_Rockets.svg/200px-Houston_Rockets.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Grizzlies")
        {
            color = '#7D9BC1';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Memphis_Grizzlies.svg/200px-Memphis_Grizzlies.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Pelicans")
        {
            color = '#0C2340';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/0/0d/New_Orleans_Pelicans_logo.svg/200px-New_Orleans_Pelicans_logo.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Spurs")
        {
            color = '#C6CFD4';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/San_Antonio_Spurs.svg/200px-San_Antonio_Spurs.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else if(gameBox[index].getElementsByClassName(teamNumber)[0].innerText == "Thunder")
        {
            color = '#0072CE';
            $(teamNumberClass).css('background','url(https://upload.wikimedia.org/wikipedia/en/thumb/5/5d/Oklahoma_City_Thunder.svg/200px-Oklahoma_City_Thunder.svg.png)');
            $(teamNumberClass).css('background-repeat','no-repeat');
            $(teamNumberClass).css('background-position','center');
        }
        else
        {
            alert('ERROR TEAM DOES NOT EXIST');
        }

        return color;
    }

    function changeCenterColor(color1,color2)
    {
        $('#big-column').css('background', color1);
        $('#big-column').css('background', '-webkit-linear-gradient(to right,'+color1+','+color2+')');
        $('#big-column').css('background', 'linear-gradient(to right,'+color1+','+color2+')');

    }
});