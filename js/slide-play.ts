namespace SlidePlayVideo
{
    export class Utils
    {
        private canvas:HTMLCanvasElement;
        private video:HTMLVideoElement;
   
        private ctx:CanvasRenderingContext2D;
     
        constructor()
        {
            this.canvas= <HTMLCanvasElement>document.getElementById("canvas2");
            this.video = <HTMLVideoElement>document.getElementById("video");
           
            this.ctx = this.canvas.getContext("2d");
           
        }
        public hasClassName(obj:any,name:string):any
        {
            return obj.className.match(new RegExp(`(\\s|^)${name}(\\s|$)`));
        }
        public addClassName(obj:any,name:string):void
        {
            if(!this.hasClassName(obj,name))
            {
                obj.className = `${name}`;
            }
        }
        public removeClassName(obj:any,name:string):void
        {
            if(this.hasClassName(obj,name))
            {
                let reg:RegExp = new RegExp(`(\\s|^)${name}(\\s|$)`);
                obj.className = obj.className.replace(reg,'');
            }
        } 
        public toggleClassName(obj:any,name:string):void
        {
            if(this.hasClassName(obj,name))
            {
                this.removeClassName(obj,name);
            }else
            {
                this.addClassName(obj,name);
            }
        }
      
    //   绘制视频
        public start():void
        {
            const play = ()=>{
                //this.offsetCtx.drawImage(this.video,0,0);
                this.ctx.drawImage(this.video,0,0);
                requestAnimationFrame(play);
            };
            requestAnimationFrame(play);
            this.video.autoplay  = true;
            this.video.load();
           
        }
    }
    // 绘制滑动图像类
   class Slider
   {
       private min:number;
       private max:number;
       private value:number;
       private x:number;
       private y:number;
       private isDragging:boolean;
       
       constructor(min?:number,max?:number,value?:number)
       {
           this.min = (min===undefined)?0:min;
           this.max = (max===undefined)?350:max;
           this.value = (value === undefined)?10:value;
           this.x = 0;
           this.y = 0;
           this.isDragging = false;
       }
       
    //    绘制遮罩图片
       public drawVideo(ctx:CanvasRenderingContext2D):void
       {
            const utils:Utils = new Utils(); 
            let image:HTMLImageElement = new Image();
            ctx.translate(this.value,this.min);
            image.onload = ()=>{
                 ctx.drawImage(image,10,0,60,60);
            };
            image.src = "./assetr/p1_bar.png";
            let canvas:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");  
            let canvasOffset:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("canvas");
            let canvasOffsetX = canvasOffset.offsetLeft;
            let canvasOffsetY = canvasOffset.offsetWidth;
            const handletouchStart = (e)=>{
                this.x = parseInt(e.touches[0].clientX)-canvasOffsetX;
                this.isDragging = true;
                     
            };
            const handleTouchMouse = (e)=>{
                this.x = parseInt(e.touches[0].clientX)-canvasOffsetX;
               
                if(this.isDragging)
                {
                    ctx.clearRect(0,0,canvas.width,canvas.height);
                    ctx.drawImage(image,this.x,0,60,60);
                    try
                     {
                        if(this.x>this.max)
                        {
                            let page1 = document.getElementById("page1");
                            page1.style.display = "none";
                            let page2 = document.getElementById("page2");
                            page2.style.display = "flex";
                            page2.style.visibility = "visible";
                            utils.addClassName(page2,"animation"); 
                            utils.start();     
                        }
                            
                    }
                    catch(err)
                    {
                        console.log(err);
                    }

                }
                // this.isDragging = false;
            };
            const handleTouchEnd = (e)=>{
                this.x = canvasOffsetX;
                  this.isDragging = false;
            };
            canvas.addEventListener("touchstart",handletouchStart,false);
            canvas.addEventListener("touchmove",handleTouchMouse,false);
            canvas.addEventListener("touchend",handleTouchEnd,false);
        }
   }

   export class SliderVideo
   {
       private slider:Slider;
       private canvas:HTMLCanvasElement;
       constructor()
       {
           this.slider = new Slider();
       }
       public drawImage():void
       {
           this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
           let ctx = this.canvas.getContext("2d");
           this.slider.drawVideo(ctx);
       } 
   }
}

         


window.onload = ()=>{
   let a = new SlidePlayVideo.SliderVideo();
   a.drawImage();    
   //let b = new SlidePlayVideo.Utils().start();

};