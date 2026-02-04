class LottoBall extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'ball');
        const number = this.getAttribute('number');
        wrapper.textContent = number;

        const style = document.createElement('style');
        style.textContent = `
            .ball {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #f1c40f;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                font-weight: bold;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(wrapper);

        this.setBallColor(parseInt(number, 10));
    }

    setBallColor(number) {
        const shadow = this.shadowRoot;
        const ball = shadow.querySelector('.ball');
        let color;
        if (number <= 10) {
            color = '#f1c40f'; // 노란색
        } else if (number <= 20) {
            color = '#3498db'; // 파란색
        } else if (number <= 30) {
            color = '#e74c3c'; // 빨간색
        } else if (number <= 40) {
            color = '#2c3e50'; // 남색
        } else {
            color = '#2ecc71'; // 녹색
        }
        ball.style.backgroundColor = color;
    }
}

customElements.define('lotto-ball', LottoBall);

document.getElementById('generator-btn').addEventListener('click', () => {
    const lottoNumbersContainer = document.getElementById('lotto-numbers');
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }

    Array.from(numbers).sort((a, b) => a - b).forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    });
});
