const windowH = innerHeight;
const windowW = innerWidth;
var ADASGraphPage;
var MoneyMarketPage;
var LoanableFundsPage
var PhilipsCurvePage; 

graphoffest = 10;



        
class PhilipsCurve
{
    constructor(x,y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 

        this.MSX1 = this.width/2; 
        this.MSX2 = this.width/2; 

        this.MSY1 = 0
        this.MSY2 = this.height
       
        this.MDX1 = 0; 
        this.MDX2 = this.width; 

        this.MDY1 = -0.5*((this.width/2)) + height/2;
        this.MDY2 = 0.5*((this.width/2)) + height/2;
        this.a = (this.width)*((-0.5)*(document.getElementById("ASInput").value-50)/50)
        this.b = (this.width)*((-0.5)*(document.getElementById("ADInput").value-50)/50); 
        
        //shifts in AD
        this.c=(this.width)*((-0.5)*(document.getElementById("ASInput").value-50)/50)//(this.width)*((document.getElementById("ADInput").value-50)/50);

        //shifts in SRAS
        this.d =(this.width)*((-0.5)*(document.getElementById("ADInput").value-50)/50); //(this.width)*((document.getElementById("ASInput").value-50)/50);


        this.isChanging = false;

        this.eX = this.width/2; 
        this.eY = this.height/2;
        this.ePL = 0.3//document.getElementById("equilPriceLevelInput").value;
        this.eQD = 1000000//document.getElementById("equilOutputInput").value;
        this.rr = parseFloat(document.getElementById("rrInput").value);

        this.MSChange = parseFloat((isNaN(document.getElementById("bondAmount").value) ||document.getElementById("bondAmount").value=="") ? 0 :document.getElementById("bondAmount").value )*(1/this.rr)
        document.getElementById("MSChange").innerHTML = this.MSChange.toFixed(2)   
        document.getElementById("moneyMulti").innerHTML =  `1 / ${this.rr.toFixed(2)}`;
        // this.MPS = 1-this.MPC; 

        //this.fiscalChange = parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS);

        // document.getElementById("MPSValue").innerHTML = this.MPS.toFixed(2);
        // document.getElementById("spendMulti").innerHTML =  `1 / ${this.MPS.toFixed(2)}`;
        // document.getElementById("outputChange").innerHTML =  ` ${parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS).toFixed(2)}`;
        // console.log(th)
        // console.log(2*((this.eY+(this.a/2) -this.b/2))/this.height)
        // console.log(p(this.ePL * (2*((this.eY+(this.a/2) -this.b/2)))/this.height))
    } 

    



    updateA(value)
    {
        this.a = (this.width)*(value/2);
        console.log(this.a);

        this.c=(this.width)*((value)/2);
        this.isChanging = false; 
    }

    updateB(value)
    {
        this.b = (this.height)*((value)/2);
        this.d=(this.height)*((value)/2);

        this.isChanging = false; 
    }

    
    govSpend(percentChange)
    {

        this.isChanging = true; 
        this.d += percentChange*this.width/2
    }

    govSave(percentChange)
    {

        this.isChanging = true; 
        this.d -= percentChange*this.width/2
    }


    convertMoneytoPosition(money)
    {
        return (money/this.eQD)*this.width
    }
    
    convertValuetoPercentChange(money)
    {
        return (money/this.eQD)
    }
    

    render() 
    {
        strokeWeight(4);
        
        //SRPC
//((this.a> this.height/4) ? (this.a-this.height/4): 0)
        stroke(243, 23, 0);
        //line(this.x + this.MDX1+ 2*Math.max(this.a+5-this.height/4,0) +graphoffest  , this.y+this.MDY1+((this.a> this.height/4) ? -this.height/4: -this.a) +graphoffest,this.x + this.MDX2+2*Math.min(this.a+this.height/4,0)-graphoffest,this.y+ this.MDY2+((this.a<-this.height/4) ? this.height/4: -this.a)-graphoffest);




        line(this.x+this.MDX1 + graphoffest+3*Math.max(this.a - this.height/8, 0 ), this.y +this.MDY1 +graphoffest/2-1.5*Math.min(this.a, this.height/8), this.x+this.MDX2-graphoffest+3*Math.min(this.a + this.height/8, 0 ), this.y+this.MDY2-graphoffest/2-1.5*Math.max(this.a, -this.height/8 ))


        stroke(0, 23, 243);

        //LRPC
        line(this.x + this.MSX2, this.y+this.MSY1,this.x +  this.MSX2,this.y+ this.MSY2);

        if(this.isChanging)
        {

            strokeWeight(4);
            stroke(243, 23, 0);
            
            line(this.x+this.MDX1 + graphoffest+3*Math.max(this.c - this.height/8, 0 ), this.y +this.MDY1 +graphoffest/2-1.5*Math.min(this.c, this.height/8), this.x+this.MDX2-graphoffest+3*Math.min(this.c + this.height/8, 0 ), this.y+this.MDY2-graphoffest/2-1.5*Math.max(this.c, -this.height/8 ))


            
            strokeWeight(1)
            stroke(255, 255, 0);
            text(parseInt(this.eQD * 2*((this.eX+(this.d)/2)/this.width)),this.eX+this.x+(this.d)/2,this.height+this.y+20 )
            
            stroke(255, 255, 0);
            text(parseFloat(this.ePL * 2*(this.height-this.eY+(this.c)-(this.d/2))/this.height).toFixed(2),this.x-20,this.eY+this.y-(this.c)+(this.d/2))

            
            stroke(0,0,0)

            if(this.c!= this.a)text("SRPC",this.x +  this.MDX2+Math.min(0,this.d), this.y+ this.MDY2-Math.max(0,this.c) - 10)



            text("E2",this.eX+this.x+(this.d+this.c)+20,  this.eY+this.y-(this.c)+(this.d/2)-10 )
            strokeWeight(6);
            circle(this.eX+this.x+(this.d+this.c), this.eY+this.y-(this.c)+(this.d/2), 4,4)
        }
        strokeWeight(6);

        stroke(0,0,0)
        circle(this.eX+this.x+(this.b+this.a), this.eY+this.y-(this.a)+(this.b/2), 4,4)

        line(this.x, this.y, this.x, this.y+this.height)

        line(this.x, this.y+this.height, this.x+this.width, this.y+this.height)


        strokeWeight(1);
        textAlign(CENTER)
        text("E1",this.eX+this.x+(this.b+this.a),  this.eY+this.y-(this.a)+(this.b/2)-10 )


        

        text("LRPC",this.x +  this.MSX2+this.b/2,  this.y+ this.MSY1-8)
        text("SRPC",this.x +  this.MDX2+Math.min(0,this.a), this.y+ this.MDY2-Math.max(0,this.a) - 10)

        stroke(255,0,0);
        
        text(parseInt(this.eQD * 2*((this.eX+(this.b)/2)/this.width)),this.eX+this.x+(this.b+this.a),this.height+this.y+20 )

        text(parseFloat (this.ePL * 2*(this.height-this.eY+(this.a)-(this.b/2))/this.height).toFixed(2),this.x-20,this.eY+this.y-(this.a)+(this.b/2))

        stroke(0,0,0)
        
        text("Inf", this.x - 50, this.height/2+this.y)


        text(parseFloat(this.ePL)*2, this.x - 20, this.y)

        text("Unemployment", this.x +this.width/2, this.height+this.y+50)


        text(parseFloat(this.eQD)*2, this.x +this.width, this.height+this.y+20)




    }
}


class LoanableFunds 
{
    constructor(x,y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 

        this.ADX1 = 0; 
        this.ADX2 = this.width; 

        this.ADY1 = -((this.width/2)) + height/2;
        this.ADY2 = ((this.width/2)) + height/2;

        this.ASX1 = 0; 
        this.ASX2 = this.width; 

        this.ASY1 = ((this.width/2)) + height/2;
        this.ASY2 = -((this.width/2)) + height/2;
        this.a = (this.width)*((document.getElementById("LFDInput").value-50)/50); 
        this.b = (this.width)*((document.getElementById("LFSInput").value-50)/50); 
        
        //shifts in AD
        this.c=(this.width)*((document.getElementById("LFDInput").value-50)/50);

        //shifts in SRAS
        this.d =(this.width)*((document.getElementById("LFSInput").value-50)/50);

        this.isChanging = false;

        this.eX = this.width/2; 
        this.eY = height/2;
        this.ePL = 0.3
        this.eQD = 300000
        this.MPC = parseFloat(document.getElementById("MPCInput").value);
        this.MPS = 1-this.MPC; 

        this.fiscalChange = parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS);

        document.getElementById("MPSValue").innerHTML = this.MPS.toFixed(2);
        document.getElementById("spendMulti").innerHTML =  `1 / ${this.MPS.toFixed(2)}`;
        document.getElementById("outputChange").innerHTML =  ` ${parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS).toFixed(2)}`;

    } 

    updateA(value)
    {
        this.a = (this.width)*((value-50)/50);

        this.c=(this.width)*((value-50)/50);
        this.isChanging = false; 
    }

    updateB(value)
    {
        this.b = (this.height)*((value-50)/50);
        this.d=(this.height)*((value-50)/50);

        this.isChanging = false; 
    }


  

    convertMoneytoPosition(money)
    {
        return (money/this.eQD)*this.width
    }
    
    convertValuetoPercentChange(money)
    {
        return (money/this.eQD)
    }


    govSpend(percentChange)
    {

        this.isChanging = true; 
        this.c += percentChange*this.width
    }

    govSave(percentChange)
    {

        this.isChanging = true; 
        this.c += percentChange*this.width
    }

    monetaryPolicyInc(percentChange)
    {

        this.isChanging = true; 
        this.d += percentChange*this.width
    }
    
    monetaryPolicyDec(percentChange)
    {

        this.isChanging = true; 
        this.d -= percentChange*this.width
    }

    render() 
    {
        
        strokeWeight(4);
        //LRAS
        //AD

        stroke(243, 23, 0);
        line(this.x + this.ADX1+Math.max(this.a,0) +graphoffest, this.y+this.ADY1-Math.min(this.a,0)+graphoffest,this.x +  this.ADX2+Math.min(0,this.a)-graphoffest,this.y+ this.ADY2-Math.max(0,this.a)-graphoffest);

        stroke(0, 23, 243);

        //AS
        line(this.x + this.ASX1+Math.max(this.b,0) + graphoffest, this.y+this.ASY1+Math.min(this.b,0) - graphoffest,this.x +  this.ASX2+Math.min(0,this.b)-graphoffest,this.y+ this.ASY2+Math.max(0,this.b)-graphoffest);

        if(this.isChanging)
        {
            stroke(243, 23, 0);
            line(this.x + this.ADX1+Math.max(this.c,0)+graphoffest , this.y+this.ADY1-Math.min(this.c,0)+graphoffest,this.x +  this.ADX2+Math.min(0,this.c)-graphoffest,this.y+ this.ADY2-Math.max(0,this.c)-graphoffest);

            stroke(0, 23, 243);

        //AS
            line(this.x + this.ASX1+Math.max(this.d,0) + graphoffest, this.y+this.ASY1+Math.min(this.d,0) - graphoffest,this.x +  this.ASX2+Math.min(0,this.d)-graphoffest,this.y+ this.ASY2+Math.max(0,this.d)-graphoffest);
            strokeWeight(1);



            stroke(255, 255, 0);
            text("$"+parseInt(this.eQD * ((this.c+this.d+this.width)/this.width)),this.eX + this.x+(this.c+this.d)/2,this.height+this.y+20. )
            
            stroke(255, 255, 0);
            text(parseFloat(this.ePL * (2*((this.eY+(this.c/2) -this.d/2)))/this.height).toFixed(2),this.x-20, this.eY+this.y-(this.c/2)+(this.d/2))
            
            stroke(0,0,0)
            if(this.c != this.a) text("Dlf2",this.x +  this.ADX2+Math.min(0,this.c),this.y+ this.ADY2-Math.max(0,this.c) - 10 )

            text("E2",this.eX+this.x+(this.c+this.d)/2-5,  this.eY+this.y-(this.c/2)+(this.d/2)-10-10 )
            strokeWeight(6);
            circle(this.eX+this.x+(this.c+this.d)/2-6, this.eY+this.y-(this.c/2)+(this.d/2)-6, 4,4)
        }
        strokeWeight(6);

        stroke(0,0,0)
        circle(this.eX+this.x+(this.a+this.b)/2-5, this.eY+this.y-(this.a/2)+(this.b/2)-5, 4,4)

        line(this.x, this.y, this.x, this.y+this.height)

        line(this.x, this.y+this.height, this.x+this.width, this.y+this.height)


        strokeWeight(1);
        text("E1",this.eX+this.x+(this.a+this.b)/2-5,  this.eY+this.y-(this.a/2)+(this.b/2)-10-5 )


        

        text("Slf1",this.x +  this.ASX2+Math.min(0,this.b),  this.y+ this.ASY2+Math.max(0,this.b) - 10)
        text("Dlf1",this.x +  this.ADX2+Math.min(0,this.a), this.y+ this.ADY2-Math.max(0,this.a) - 10)

        stroke(255,0,0);
        
        text("$"+parseInt(this.eQD * ((this.a+this.b+this.width)/this.width)),this.eX + this.x+(this.a+this.b)/2,this.height+this.y+20. )

        text(parseFloat(this.ePL * (2*((this.eY+(this.a/2) -this.b/2)))/this.height).toFixed(2),this.x-20, this.eY+this.y-(this.a/2)+(this.b/2))

        stroke(0,0,0)

        text("rIR", this.x - 50, this.height/2+this.y)


        text(parseFloat(this.ePL)*2, this.x - 20, this.y)

        text("QLF", this.x +this.width/2, this.height+this.y+50)


        text("$"+(parseFloat(this.eQD)*2).toFixed(2), this.x +this.width, this.height+this.y+20)

    }
}





        
class MoneyMarket
{
    constructor(x,y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 

        this.MSX1 = this.width/2; 
        this.MSX2 = this.width/2; 

        this.MSY1 = 0
        this.MSY2 = this.height
       
        this.MDX1 = 0; 
        this.MDX2 = this.width; 

        this.MDY1 = -((this.width/2)) + height/2;
        this.MDY2 = ((this.width/2)) + height/2;
        this.a = (this.width)*((document.getElementById("MDInput").value-50)/50); 
        this.b = (this.width)*((document.getElementById("MSInput").value-50)/50); 
        
        //shifts in AD
        this.c=(this.width)*((document.getElementById("MDInput").value-50)/50)//(this.width)*((document.getElementById("ADInput").value-50)/50);

        //shifts in SRAS
        this.d =(this.width)*((document.getElementById("MDInput").value-50)/50)//(this.width)*((document.getElementById("ASInput").value-50)/50);


        this.isChanging = false;

        this.eX = this.width/2; 
        this.eY = this.height/2;
        this.ePL = 0.5//document.getElementById("equilPriceLevelInput").value;
        this.eQD = 1000000//document.getElementById("equilOutputInput").value;
        this.rr = parseFloat(document.getElementById("rrInput").value);

        this.MSChange = parseFloat((isNaN(document.getElementById("bondAmount").value) ||document.getElementById("bondAmount").value=="") ? 0 :document.getElementById("bondAmount").value )*(1/this.rr)
        document.getElementById("MSChange").innerHTML = this.MSChange.toFixed(2)   
        document.getElementById("moneyMulti").innerHTML =  `1 / ${this.rr.toFixed(2)}`;
        // this.MPS = 1-this.MPC; 

        //this.fiscalChange = parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS);

        // document.getElementById("MPSValue").innerHTML = this.MPS.toFixed(2);
        // document.getElementById("spendMulti").innerHTML =  `1 / ${this.MPS.toFixed(2)}`;
        // document.getElementById("outputChange").innerHTML =  ` ${parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS).toFixed(2)}`;
        // console.log(th)
        // console.log(2*((this.eY+(this.a/2) -this.b/2))/this.height)
        // console.log(p(this.ePL * (2*((this.eY+(this.a/2) -this.b/2)))/this.height))
    } 





    updateA(value)
    {
        this.a = (this.width)*((value-50)/50);

        this.c=(this.width)*((value-50)/50);
        this.isChanging = false; 
    }

    updateB(value)
    {
        this.b = (this.height)*((value-50)/50);
        this.d=(this.height)*((value-50)/50);

        this.isChanging = false; 
    }

    updateEIR(value)
    {
        if(isNaN(value)) return;
        this.eIR = value;
    }

    updateEQM(value)
    {
        if(isNaN(value)) return;
        this.eQM = value;
    }

    updateRR(value)
    {
        if(isNaN(value)) return;
        if(value >=1 ) return;
        this.rr = value;
        document.getElementById("moneyMulti").innerHTML =  `1 / ${this.rr.toFixed(2)}`;
        this.updateMonetaryPolicy()
    }

    updateMonetaryPolicy()
    {

        if(isNaN(document.getElementById("bondAmount").value) ||document.getElementById("bondAmount").value=="" ) return;
        let value = document.getElementById("bondAmount").value
        this.MSChange = parseFloat(value)*(1/this.rr)
        document.getElementById("MSChange").innerHTML = this.MSChange.toFixed(2)           
    }


    BondBuy()
    {
        this.d += this.convertMoneytoPosition(this.MSChange)
        this.isChanging = true; 
        ADASGraphPage.monetaryPolicyInc(this.convertValuetoPercentChange(this.MSChange))
        LoanableFundsPage.monetaryPolicyInc(this.convertValuetoPercentChange(this.MSChange))
    }
    BondSell()
    {
        this.d -= this.convertMoneytoPosition(this.MSChange)
        this.isChanging = true; 
        ADASGraphPage.monetaryPolicyDec(this.convertValuetoPercentChange(this.MSChange))
        LoanableFundsPage.monetaryPolicyDec(this.convertValuetoPercentChange(this.MSChange))
    }

    MDInc(percentChange)
    {

        this.isChanging = true; 
        this.c += percentChange*this.width
    }

    MDDec(percentChange)
    {

        this.isChanging = true; 
        this.c -= percentChange*this.width
        console.log("FART   ")
    }

    convertMoneytoPosition(money)
    {
        return (money/this.eQD)*this.width
    }
    
    convertValuetoPercentChange(money)
    {
        return (money/this.eQD)
    }
    

    render() 
    {
        strokeWeight(4);
        //LRAS
        //MD

        stroke(243, 23, 0);
        line(this.x + this.MDX1+Math.max(this.a,0) +graphoffest , this.y+this.MDY1-Math.min(this.a,0) + graphoffest,this.x +  this.MDX2+Math.min(0,this.a)-graphoffest,this.y+ this.MDY2-Math.max(0,this.a)-graphoffest);

        stroke(0, 23, 243);

        //MS
        line(this.x +  this.MSX2+this.b/2, this.y+this.MSY1,this.x +  this.MSX2+this.b/2,this.y+ this.MSY2);

        if(this.isChanging)
        {

            strokeWeight(4);
            stroke(243, 23, 0);
            line(this.x + this.MDX1+Math.max(this.c,0)+graphoffest , this.y+this.MDY1-Math.min(this.c,0)+graphoffest,this.x +  this.MDX2+Math.min(0,this.c)-graphoffest,this.y+ this.MDY2-Math.max(0,this.c)-graphoffest);
            

            stroke(0, 23, 243);

            //MS
            line(this.x +  this.MSX2+this.d/2, this.y+this.MSY1,this.x +  this.MSX2+this.d/2,this.y+ this.MSY2);
            strokeWeight(1)
            stroke(255, 255, 0);
            text(parseInt(this.eQD * 2*((this.eX+(this.d)/2)/this.width)),this.eX+this.x+(this.d)/2,this.height+this.y+20 )
            
            stroke(255, 255, 0);
            text(parseFloat (this.ePL * 2*(this.height-this.eY+(this.c)-(this.d/2))/this.height).toFixed(2),this.x-20,this.eY+this.y-(this.c)+(this.d/2))
            
            stroke(0,0,0)

            if(this.d!=this.b)text("MS2",this.x +  this.MSX2+this.d/2,  this.y+ this.MSY1-8)

            if(this.c!=this.a) text("MD2",this.x +  this.MDX2+Math.min(0,this.c), this.y+ this.MDY2-Math.max(0,this.c) - 10)


            text("E2",this.eX+this.x+(this.d)/2+20,  this.eY+this.y-(this.c)+(this.d/2)-10 )
            strokeWeight(6);
            circle(this.eX+this.x+(this.d)/2, this.eY+this.y-(this.c)+(this.d/2), 4,4)
        }
        strokeWeight(6);

        stroke(0,0,0)
        circle(this.eX+this.x+(this.b)/2, this.eY+this.y-(this.a)+(this.b/2), 4,4)

        line(this.x, this.y, this.x, this.y+this.height)

        line(this.x, this.y+this.height, this.x+this.width, this.y+this.height)


        strokeWeight(1);
        textAlign(CENTER)
        text("E1",this.eX+this.x+(this.b)/2+20,  this.eY+this.y-(this.a)+(this.b/2)-10 )


        

        text("MS1",this.x +  this.MSX2+this.b/2,  this.y+ this.MSY1-8)
        text("MD1",this.x +  this.MDX2+Math.min(0,this.a), this.y+ this.MDY2-Math.max(0,this.a) - 10)

        stroke(255,0,0);
        
        text(parseInt(this.eQD * 2*((this.eX+(this.b)/2)/this.width)),this.eX+this.x+(this.b)/2,this.height+this.y+20 )

        text(parseFloat (this.ePL * 2*(this.height-this.eY+(this.a)-(this.b/2))/this.height).toFixed(2),this.x-20,this.eY+this.y-(this.a)+(this.b/2))

        stroke(0,0,0)
        
        text("nIR", this.x - 50, this.height/2+this.y)


        text(parseFloat(this.ePL)*2, this.x - 20, this.y)

        text("MQ", this.x +this.width/2, this.height+this.y+50)


        text(parseFloat(this.eQD)*2, this.x +this.width, this.height+this.y+20)




    }
}
class ADASGraph
{
    constructor(x,y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height; 

        this.ADX1 = 0; 
        this.ADX2 = this.width; 

        this.ADY1 = -((this.width/2)) + height/2;
        this.ADY2 = ((this.width/2)) + height/2;

        this.ASX1 = 0; 
        this.ASX2 = this.width; 

        this.ASY1 = ((this.width/2)) + height/2;
        this.ASY2 = -((this.width/2)) + height/2;
        this.a = (this.width)*((document.getElementById("ADInput").value-50)/50); 
        this.b = (this.width)*((document.getElementById("ASInput").value-50)/50); 
        
        //shifts in AD
        this.c=(this.width)*((document.getElementById("ADInput").value-50)/50);

        //shifts in SRAS
        this.d =(this.width)*((document.getElementById("ASInput").value-50)/50);

        this.isChanging = false;

        this.eX = this.width/2; 
        this.eY = height/2;
        this.ePL = document.getElementById("equilPriceLevelInput").value;
        this.eQD = document.getElementById("equilOutputInput").value;
        this.MPC = parseFloat(document.getElementById("MPCInput").value);
        this.MPS = 1-this.MPC; 

        this.fiscalChange = parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS);

        document.getElementById("MPSValue").innerHTML = this.MPS.toFixed(2);
        document.getElementById("spendMulti").innerHTML =  `1 / ${this.MPS.toFixed(2)}`;
        document.getElementById("outputChange").innerHTML =  ` ${parseFloat(document.getElementById("fiscalInput").value)*(1/this.MPS).toFixed(2)}`;

    } 

    updateA(value)
    {
        this.a = (this.width)*((value-50)/50);

        this.c=(this.width)*((value-50)/50);
        this.isChanging = false; 
        PhilipsCurvePage.updateB(-((value-50)/50))
    }

    updateB(value)
    {
        this.b = (this.height)*((value-50)/50);
        this.d=(this.height)*((value-50)/50);

        this.isChanging = false; 

        PhilipsCurvePage.updateA(-((value-50)/50));
    }

    updateEPL(value)
    {
        if(isNaN(value)) return;
        this.ePL = value;
    }

    updateEY(value)
    {
        if(isNaN(value)) return;
        this.eQD = value;
    }

    updateMPC(value)
    {
        if(isNaN(value)) return;
        if(value >=1 ) return;
        this.MPC = value;
        this.MPS = 1 - this.MPC;
        document.getElementById("MPSValue").innerHTML = this.MPS.toFixed(2);
        document.getElementById("spendMulti").innerHTML =  `1 / ${this.MPS.toFixed(2)}`;
        updateFiscalAmount()
    }

    updateFiscalAmount(value)
    {
        this.fiscalChange = parseFloat(value)*(1/this.MPS)
        document.getElementById("outputChange").innerHTML = this.fiscalChange.toFixed(2)   
    }

    GDPSpend()
    {
        this.isChanging = true; 
        this.c += this.convertMoneytoPosition(this.fiscalChange); 
        MoneyMarketPage.MDInc(this.convertValuetoPercentChange(this.fiscalChange))
        LoanableFundsPage.govSpend(this.convertValuetoPercentChange(this.fiscalChange))
        PhilipsCurvePage.govSave(this.convertValuetoPercentChange(this.fiscalChange))
    }

    GDPSave()
    {
        this.isChanging = true; 
        this.c -= this.convertMoneytoPosition(this.fiscalChange); 
        MoneyMarketPage.MDDec(this.convertValuetoPercentChange(this.fiscalChange))

        LoanableFundsPage.govSave(this.convertValuetoPercentChange(this.fiscalChange))

        PhilipsCurvePage.govSpend(this.convertValuetoPercentChange(this.fiscalChange))
    }

    convertMoneytoPosition(money)
    {
        return (money/this.eQD)*this.width
    }
    
    convertValuetoPercentChange(money)
    {
        return (money/this.eQD)
    }

    monetaryPolicyInc(percentChange)
    {

        this.isChanging = true; 
        console.log(percentChange)
        this.c += percentChange*this.width
    }
    
    monetaryPolicyDec(percentChange)
    {

        this.isChanging = true; 
        console.log(percentChange)
        this.c -= percentChange*this.width
    }

    render() 
    {
        
        strokeWeight(4);
        //LRAS
        stroke(0,180,0)
        line(this.x+this.width/2, this.y, this.x+this.width/2, this.y+this.height)
        //AD

        stroke(243, 23, 0);
        line(this.x + this.ADX1+Math.max(this.a,0) +graphoffest, this.y+this.ADY1-Math.min(this.a,0)+graphoffest,this.x +  this.ADX2+Math.min(0,this.a)-graphoffest,this.y+ this.ADY2-Math.max(0,this.a)-graphoffest);

        stroke(0, 23, 243);

        //AS
        line(this.x + this.ASX1+Math.max(this.b,0)+graphoffest, this.y+this.ASY1+Math.min(this.b,0)-graphoffest,this.x +  this.ASX2+Math.min(0,this.b)-graphoffest,this.y+ this.ASY2+Math.max(0,this.b)+graphoffest);

        if(this.isChanging)
        {
            stroke(243, 23, 0);
            line(this.x + this.ADX1+Math.max(this.c,0) +graphoffest , this.y+this.ADY1-Math.min(this.c,0)+graphoffest,this.x +  this.ADX2+Math.min(0,this.c)-graphoffest,this.y+ this.ADY2-Math.max(0,this.c)-graphoffest);
            strokeWeight(1);

            stroke(255, 255, 0);        
            text("$"+parseInt(this.ePL * (2*((this.eY+(this.c/2) -this.d/2)))/this.height),this.x-20, this.eY+this.y-(this.c/2)+(this.d/2))
            
            stroke(255, 255, 0);
            text(parseFloat(this.eQD * ((this.c+this.d+this.width)/this.width)).toFixed(2),this.eX + this.x+(this.c+this.d)/2,this.height+this.y+20. )
            
            stroke(0,0,0)
            text("AD2",this.x +  this.ADX2+Math.min(0,this.c),this.height+this.y-20. )

            text("E2",this.eX+this.x+(this.c+this.d)/2,  this.eY+this.y-(this.c/2)+(this.d/2)-10 )
            strokeWeight(6);
            circle(this.eX+this.x+(this.c+this.d)/2, this.eY+this.y-(this.c/2)+(this.d/2), 4,4)
        }
        strokeWeight(6);

        stroke(0,0,0)
        circle(this.eX+this.x+(this.a+this.b)/2, this.eY+this.y-(this.a/2)+(this.b/2), 4,4)

        line(this.x, this.y, this.x, this.y+this.height)

        line(this.x, this.y+this.height, this.x+this.width, this.y+this.height)


        strokeWeight(1);
        text("E1",this.eX+this.x+(this.a+this.b)/2,  this.eY+this.y-(this.a/2)+(this.b/2)-10 )


        

        text("SRAS1",this.x +  this.ASX2+Math.min(0,this.b),  this.y+ this.ASY2+Math.max(0,this.b) - 10)
        text("AD1",this.x +  this.ADX2+Math.min(0,this.a), this.y+ this.ADY2-Math.max(0,this.a) - 10)

        stroke(255,0,0);
        
        text(parseFloat(this.eQD * ((this.a+this.b+this.width)/this.width)).toFixed(2),this.eX + this.x+(this.a+this.b)/2,this.height+this.y+20. )

        text("$"+parseInt(this.ePL * (2*((this.eY+(this.a/2) -this.b/2)))/this.height),this.x-20, this.eY+this.y-(this.a/2)+(this.b/2))

        stroke(0,0,0)
        
        text("LRAS",this.x +  this.width/2, this.y-10)

        text("PL", this.x - 50, this.height/2+this.y)

        text("$"+parseFloat(this.ePL), this.x - 20, this.y+this.height/2)

        text("$"+parseFloat(this.ePL)*2, this.x - 20, this.y)

        text("Y", this.x +this.width/2, this.height+this.y+50)

        text((parseFloat(this.eQD)).toFixed(2), this.x +this.width/2, this.height+this.y+20)

        text((parseFloat(this.eQD)*2).toFixed(2), this.x +this.width, this.height+this.y+20)

    }
}
function setup()
{
    ADASGraphPage= new ADASGraph(80,50,300,300);
    MoneyMarketPage = new MoneyMarket(80,440 , 300, 300)
    LoanableFundsPage = new LoanableFunds(450, 50, 300, 300);
    PhilipsCurvePage = new PhilipsCurve(450, 440, 300, 300);
    createCanvas(innerWidth-50,ADASGraphPage.height+ADASGraphPage.y +MoneyMarketPage.height +(MoneyMarketPage.y-ADASGraphPage.y )+LoanableFundsPage.height +500 );

}

function draw()
{
    clear();
    ADASGraphPage.render();
    MoneyMarketPage.render();   
    LoanableFundsPage.render()
    PhilipsCurvePage.render();
}


function UpdateAD()
{
    ADASGraphPage.updateA(document.getElementById("ADInput").value)
}
function UpdateAS()
{
    ADASGraphPage.updateB(document.getElementById("ASInput").value)
}

function govSpend()
{
    ADASGraphPage.govSpend();
}


function govSave()
{
    ADASGraphPage.govSave();
}

function updateEPL()
{
    ADASGraphPage.updateEPL((parseInt(document.getElementById("equilPriceLevelInput").value)));
}

function updateEQD()
{
    ADASGraphPage.updateEPL((parseInt(document.getElementById("equilPriceLevelInput").value)));
}
function updateEY()
{
    ADASGraphPage.updateEY(parseInt(document.getElementById("equilOutputInput").value))
}

function updateMPC()
{
    ADASGraphPage.updateMPC(parseFloat(document.getElementById("MPCInput").value))
}

function updateFiscalAmount()
{
    if(isNaN(document.getElementById("fiscalInput").value) ||document.getElementById("fiscalInput").value=="" ) return;
    ADASGraphPage.updateFiscalAmount(document.getElementById("fiscalInput").value)
}

function GovSpend()
{
    ADASGraphPage.GDPSpend(); 
}
function GovSave()
{
    ADASGraphPage.GDPSave(); 
}

function resetASAD()
{
    document.getElementById("ADInput").value = 50
    document.getElementById("ASInput").value = 50
    UpdateAD()
    UpdateAS()
}

function UpdateMD()
{
    MoneyMarketPage.updateA(document.getElementById("MDInput").value)
}


function UpdateMS()
{
    MoneyMarketPage.updateB(document.getElementById("MSInput").value)
}

function resetMDMS()
{
    document.getElementById("MDInput").value = 50
    document.getElementById("MSInput").value = 50
    UpdateMD()
    UpdateMS()
}

function updateRR()
{

    MoneyMarketPage.updateRR(parseFloat(document.getElementById("rrInput").value))
}

function Money()
{
    ADASGraphPage.GDPSpend(); 
}
function BondBuy()
{
    MoneyMarketPage.BondBuy(); 
}

function BondSell()
{
    MoneyMarketPage.BondSell(); 
}

function UpdateLFD()
{

    LoanableFundsPage.updateA(document.getElementById("LFDInput").value)
}

function UpdateLFS()
{

    LoanableFundsPage.updateB(document.getElementById("LFSInput").value)
}

function IncInvest()
{
    LoanableFundsPage.IncInvest();
}


function DecInvest()
{
    LoanableFundsPage.DecInvest();
}

function resetLF() 
{
    document.getElementById("LFDInput").value = 50
    document.getElementById("LFSInput").value = 50
    UpdateLFD()
    UpdateLFS()
}