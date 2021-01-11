<!--

Copyright (c) 2020 - Adam Bergman - https://codepen.io/AshBardhan/pen/dNKwXz

Permission is hereby granted, free of charge, to any person 
obtaining a copy of this software and associated documentation 
files (the "Software"), to deal in the Software without restriction,
 including without limitation the rights to use, copy, modify, 
merge, publish, distribute, sublicense, and/or sell copies of 
the Software, and to permit persons to whom the Software is 
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall 
be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES 
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.







Jag har gjort om så det passar i vue men kärnan är från https://codepen.io/AshBardhan/pen/dNKwXz
-->





<template>
    <div class="mainDiv">
            <div class="emoji  emoji--sad">
                <div class="emoji__face">
                    <div class="emoji__eyebrows"></div>
                    <div class="emoji__eyes"></div>
                    <div class="emoji__mouth"></div>
                </div>
            </div>
    </div>

</template>


<script>
export default {
  name: 'CollectorsSadEmoji'
}
</script>

<style lang="css" scoped>

.mainDiv {
  margin: 0;
  width: 100%;
  max-width: 100%;
  text-align: center;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  top: 0;
  left: 0;
}
.emoji {
  width: 120px;
  height: 120px;
  margin: 15px 15px 40px;
  background: #FFDA6A;
  display: inline-block;
  border-radius: 50%;
  position: relative;
}
.emoji:after {
  position: absolute;
  bottom: -40px;
  font-size: 18px;
  width: 60px;
  left: calc(50% - 30px);
  color: #8A8A8A;
}
.emoji__face, .emoji__eyebrows, .emoji__eyes, .emoji__mouth {
  position: absolute;
}
.emoji__face:before, .emoji__eyebrows:before, .emoji__eyes:before, .emoji__mouth:before, .emoji__face:after, .emoji__eyebrows:after, .emoji__eyes:after, .emoji__mouth:after {
  position: absolute;
  content: '';
}
.emoji__face {
  width: inherit;
  height: inherit;
}
.emoji--sad:after {
  content: 'Sad';
}
.emoji--sad .emoji__face {
  animation: sad-face 2s ease-in infinite;
}
.emoji--sad .emoji__eyebrows {
  left: calc(50% - 3px);
  top: 35px;
  height: 6px;
  width: 6px;
  border-radius: 50%;
  background: transparent;
  box-shadow: -40px 9px 0 0 #000000, -25px 0 0 0 #000000, 25px 0 0 0 #000000, 40px 9px 0 0 #000000;
}
.emoji--sad .emoji__eyebrows:before, .emoji--sad .emoji__eyebrows:after {
  width: 30px;
  height: 20px;
  border: 6px solid #000000;
  box-sizing: border-box;
  border-radius: 50%;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  top: 2px;
  left: calc(50% - 15px);
}
.emoji--sad .emoji__eyebrows:before {
  margin-left: -30px;
  transform: rotate(-30deg);
}
.emoji--sad .emoji__eyebrows:after {
  margin-left: 30px;
  transform: rotate(30deg);
}
.emoji--sad .emoji__eyes {
  width: 14px;
  height: 16px;
  left: calc(50% - 7px);
  top: 50px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 25px 0 0 0 #000000, -25px 0 0 0 #000000;
}
.emoji--sad .emoji__eyes:after {
  background: #548DFF;
  width: 12px;
  height: 12px;
  margin-left: 6px;
  border-radius: 0 100% 40% 50Array/0Array 50% 40% 100%;
  transform-origin: 0% 0%;
  animation: tear-drop 2s ease-in infinite;
}
.emoji--sad .emoji__mouth {
  width: 60px;
  height: 80px;
  left: calc(50% - 30px);
  top: 80px;
  box-sizing: border-box;
  border: 6px solid #000000;
  border-radius: 50%;
  border-bottom-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  background: transparent;
  animation: sad-mouth 2s ease-in infinite;
}
.emoji--sad .emoji__mouth:after {
  width: 6px;
  height: 6px;
  background: transparent;
  border-radius: 50%;
  top: 4px;
  left: calc(50% - 3px);
  box-shadow: -18px 0 0 0 #000000, 18px 0 0 0 #000000;
}
@keyframes sad-face {
  25%, 35% {
    top: -15px;
  }
  55%, 95% {
    top: 10px;
  }
  100%, 0% {
    top: 0;
  }
}
@keyframes sad-mouth {
  25%, 35% {
    transform: scale(0.85);
    top: 70px;
  }
  55%, 100%, 0% {
    transform: scale(1);
    top: 80px;
  }
}
@keyframes tear-drop {
  0%, 100% {
    display: block;
    left: 35px;
    top: 15px;
    transform: rotate(45deg) scale(0);
  }
  25% {
    display: block;
    left: 35px;
    transform: rotate(45deg) scale(2);
  }
  49.9% {
    display: block;
    left: 35px;
    top: 65px;
    transform: rotate(45deg) scale(0);
  }
  50% {
    display: block;
    left: -35px;
    top: 15px;
    transform: rotate(45deg) scale(0);
  }
  75% {
    display: block;
    left: -35px;
    transform: rotate(45deg) scale(2);
  }
  99.9% {
    display: block;
    left: -35px;
    top: 65px;
    transform: rotate(45deg) scale(0);
  }
}


@media screen and (max-width: 1400px){
    .mainDiv{
        transform: scale(0.7);
    }
}

@media screen and (max-width: 1200px){
    .mainDiv{
        transform: scale(0.55)translateY(-40%);
    }
}

@media screen and (max-width: 800px){
    .mainDiv{
        transform: scale(0.3)translateY(-100%);
    }
}


</style>
