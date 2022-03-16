let a = []
let sx=0,sy=0,ex=0,ey=0;

function GenerateMap()
{
	for (var i=0;i<15;i++)
	{
		for (var j=0;j<25;j++)
		{
			if (Math.random()<0.1)
			{
				a[i][j]=1;
			}
			else
			{
				a[i][j]=0;
			}
		}
	}
}

function DrawMap(t)
{
	var canvas = document.getElementById("canvas1");
	var ctx = canvas.getContext('2d');
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for (var i=0;i<15;i++)
	{
		for (var j=0;j<25;j++)
		{		
			ctx.drawImage(imgs[a[i][j]%10], j*40, i*40);
		}
	}
	
	if (t==1)
	{
		ctx.strokeStyle = "#FF0000";
		ctx.font = 'bold 12px Arial';	
		for (var i=0;i<15;i++)
		{
			for (var j=0;j<25;j++)
			{
				var txt = Math.floor(a[i][j]/100)+"";
				var clr = Math.floor(a[i][j]/10) % 10;
				if (clr==0) {ctx.fillStyle = "#0000FF";}
				else if (clr==1) {ctx.fillStyle = "#00FF00";}
				else {ctx.fillStyle = "#FF0000";}
				
				ctx.fillText(txt, j*40+10, i*40+10);
				if ((i==sy)&&(j==sx))
				{
					ctx.strokeText('S', j*40+20, i*40+20);
				}
				if ((i==ey)&&(j==ex))
				{
					ctx.strokeText('E', j*40+20, i*40+20);
				}				
			}
		}	
	}
}

GenerateMap()
DrawMap(1)