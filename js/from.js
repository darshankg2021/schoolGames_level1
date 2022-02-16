class Form {
    constructor(){
        this.input = createInput("").attribute("placeholder", "Enter Your name");
        this.button = createButton("play");
        this.title = createElement("h1");
        this.introduction = createElement("h3");
        this.button2 = createButton("Start");
    }

    inputStyle(){
        this.input.class("customInput");
        this.button.class("customButton");
        this.title.class("greeting");
    }

    inputPosition(){
        this.input.position(width/2 - 100 , height/2 - 50);
        this.button.position(width/2 - 80, height/2 + 20);
        this.title.html("Level 1");
        this.title.position(width/2 - 50 , height/6);
    }

    hide(){
        this.input.hide();
        this.button.hide();
        this.title.hide();
    }

    mousePressedButton(){
        this.button.mousePressed(()=>{
            this.introduction.class("greeting");
            this.introduction.position(width/8 - 200, height/2 - 200);
            var int = `
            Hi ${this.input.value()}
            </br> it is the game of school &
            idea by RAM KARTICK &
            Software Manager DARSHAN KUMAR & 
            Animation Searching by DARSHAN KUMAR `;
            gameState = "start";
            this.introduction.html(int);

            this.button2.class("customButton");
            this.button2.position(width/2 - 100, height/2 + 50);
        });
    }

    mousePressedStartButton(){
        this.button2.mousePressed(()=>{
            gameState = "play";
            this.introduction.hide();
            this.button2.hide();

            laser1.velocityY = -7;
            laser2.velocityY = 7;
        });
    }

    display(){
        this.inputStyle();
        this.inputPosition(); 
        this.mousePressedButton();
        this.mousePressedStartButton();
    }
}
