class DOMAnimation {
    constructor() {
        //h2 and paragraph animation
        this.headerTextContents = ['Dochody', 'Wydatki', 'Podsumowanie', ''];
        this.paragraphsTextContents = ['Wypełnij pola formularza, aby obliczyć swoje dochody...', 'Wypełnij pola formularza, aby obliczyć swoje wydatki...', 'Oto bilans Twoich przychodów i wydatków:'];
        this.headerInterval;
        this.paragraphInterval;

        let indexH2 = 0;
        let arrayIndexH2 = 0;
        let step = 1;
        const h2 = document.querySelector('#text h2.typeWriter');
        this.changeHeaderText = () => {
            const targetTxt = this.headerTextContents;
            h2.textContent += targetTxt[arrayIndexH2][indexH2++];
            if (indexH2 >= targetTxt[arrayIndexH2].length) {
                arrayIndexH2++;
                indexH2 = 0;
                document.querySelector('#step').textContent = step++;
                clearInterval(this.headerInterval);
            }
        }

        let indexP = 0;
        let arrayIndexP = 0;
        const p = document.querySelector('#text span.typeWriter');
        this.changeParagraphText = () => {
            const targetTxt = this.paragraphsTextContents;
            if (h2.textContent.length == this.headerTextContents[arrayIndexP].length) {
                p.textContent += targetTxt[arrayIndexP][indexP++];
                if (indexP >= targetTxt[arrayIndexP].length) {
                    arrayIndexP++;
                    indexP = 0;
                    clearInterval(this.paragraphInterval);
                }
            }
        }

        //change section animation
        const sections = document.querySelectorAll('main section.operating');
        let activeSection = 0;
        this.changeSection = () => {
            sections[activeSection].style.animation = 'hideSection .5s linear both';

            setTimeout(() => {
                sections[activeSection++].style.display = 'none';
                sections[activeSection].classList.remove('hidden');
                sections[activeSection].style.animation = 'showSection .5s linear both';
            }, 500)
        }


        //add event listener to btns
        const buttons = document.querySelectorAll('section.operating button');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('h2.typeWriter').textContent = '';
                document.querySelector('span.typeWriter').textContent = '';
                this.headerInterval = setInterval(this.changeHeaderText, 80);
                this.paragraphInterval = setInterval(this.changeParagraphText, 40);
                this.changeSection();
            })
        })
        
        this.mediaQuery()
    }
    mediaQuery() {
        if (window.matchMedia('(max-width: 1025px)').matches) {
            document.querySelector('h2.invisible').classList.add('hidden');
        }
        if (window.matchMedia('(max-width: 415px)').matches) {
            document.querySelectorAll('select option:nth-of-type(1)').forEach(opt => {
                opt.textContent = "MSC";
            });
            document.querySelectorAll('select option:nth-of-type(2)').forEach(opt => {
                opt.textContent = "ROK";
            });
            document.querySelectorAll('form>input').forEach(ipt => {
                ipt.placeholder = "PLN";
            });
            document.querySelector('header').remove();
            document.querySelector('#summary h2').remove();

        }
    }
}

const DOM = new DOMAnimation();