const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let canvasWidth = window.innerWidth;
let canvasHeight = window.innerHeight;
let maxCharCount = 10000;
let fallingCharArray = [];
let fontSize = 12;
let maxColumns = canvasWidth / fontSize;
let frames = 0;
let charArray = [
    'あ', 'い', 'う', 'え', 'お', 'か', 'き', 'く', 'け', 'こ', 'が', 'ぎ', 'ぐ', 'げ', 'ご', 'さ', 'し', 'す', 'せ', 'そ', 'ざ', 'じ', 'ず', 'ぜ', 'ぞ', 'た', 'ち', 'つ', 'て', 'と', 'だ', 'ぢ', 'づ', 'で', 'ど', 'な', 'に', 'ぬ', 'の', 'は', 'ひ', 'ふ', 'へ', 'ほ', 'ば', 'び', 'ぶ', 'べ', 'ぼ', 'ぱ', 'ぴ', 'ぷ', 'ぺ', 'ぽ', 'ま', 'み', 'む', 'め', 'も', 'や', 'ゆ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'わ', 'を', 'ん'
];

canvas.width = canvasWidth;
canvas.height = canvasHeight;

class FallingChar
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    draw(ctx)
    {
        this.value = charArray[Math.floor(Math.random() * (charArray.length - 1))].toUpperCase();
        this.speed = (Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;

        ctx.fillStyle = 'rgba(0, 255, 0)';
        ctx.font = fontSize + 'px san-serif';
        ctx.fillText(this.value, this.x, this.y);
        this.y += this.speed;

        if (this.y > canvasHeight) 
        {
            this.draw.y = Math.random() * canvasHeight / 2 - 50;
            this.x = Math.floor(Math.random() * maxColumns) * fontSize;
            this.speed = (-Math.random() * fontSize * 3) / 4 + (fontSize * 3) / 4;
        }
    }
}

let update = () => {
    if(fallingCharArray.length < maxCharCount)
    {
        let fallingChar = new FallingChar(
            Math.floor(Math.random() * maxColumns) * fontSize,
            (Math.random() * canvasHeight) / 2 - 50
        );

        fallingCharArray.push(fallingChar);
    }

    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    for (let i = 0; i < fallingCharArray.length && frames % 2 == 0; i++) 
    {
        fallingCharArray[i].draw(ctx);
    }

    requestAnimationFrame(update);
    frames++;
}

update();