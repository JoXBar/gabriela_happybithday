// Juego de memoria
        document.addEventListener('DOMContentLoaded', function() {
            const emojis = ['🌸', '🌺', '🌷', '🌹', '🌻', '🌼', '💐', '🏵️'];
            const cards = [...emojis, ...emojis];
            
            const gameContainer = document.getElementById('memory-game');
            let flippedCards = [];
            let matchedPairs = 0;
            
            // Barajar cartas
            cards.sort(() => 0.5 - Math.random());
            
            // Crear cartas
            cards.forEach((emoji, index) => {
                const card = document.createElement('div');
                card.classList.add('memory-card');
                card.dataset.index = index;
                card.dataset.value = emoji;
                card.innerHTML = `<span style="visibility: hidden;">${emoji}</span>`;
                card.addEventListener('click', flipCard);
                gameContainer.appendChild(card);
            });
            
            // Voltear carta
            function flipCard() {
                if (flippedCards.length < 2 && !this.classList.contains('flipped')) {
                    this.classList.add('flipped');
                    this.querySelector('span').style.visibility = 'visible';
                    flippedCards.push(this);
                    
                    if (flippedCards.length === 2) {
                        checkForMatch();
                    }
                }
            }
            
            // Comprobar coincidencia
            function checkForMatch() {
                const [card1, card2] = flippedCards;
                
                if (card1.dataset.value === card2.dataset.value) {
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    matchedPairs++;
                    
                    if (matchedPairs === emojis.length) {
                        setTimeout(() => {
                            alert('¡Felicidades! Has encontrado todas las parejas.');
                            createConfetti();
                        }, 500);
                    }
                    
                    flippedCards = [];
                } else {
                    setTimeout(() => {
                        card1.classList.remove('flipped');
                        card2.classList.remove('flipped');
                        card1.querySelector('span').style.visibility = 'hidden';
                        card2.querySelector('span').style.visibility = 'hidden';
                        flippedCards = [];
                    }, 1000);
                }
            }
            
            // Crear constelación
            function createConstellation() {
                const container = document.getElementById('constellation-canvas');
                const containerWidth = container.offsetWidth;
                const containerHeight = container.offsetHeight;
                
                // Crear estrellas
                for (let i = 0; i < 100; i++) {
                    const star = document.createElement('div');
                    star.classList.add('star');
                    
                    // Tamaño aleatorio
                    const size = Math.random() * 3 + 1;
                    star.style.width = `${size}px`;
                    star.style.height = `${size}px`;
                    
                    // Posición aleatoria
                    star.style.left = `${Math.random() * containerWidth}px`;
                    star.style.top = `${Math.random() * containerHeight}px`;
                    
                    // Animación con delay aleatorio
                    star.style.animationDelay = `${Math.random() * 2}s`;
                    
                    container.appendChild(star);
                }
                
                // Crear algunas líneas entre estrellas (constelaciones)
                const stars = document.querySelectorAll('.star');
                const connections = Math.min(20, stars.length / 2);
                
                for (let i = 0; i < connections; i++) {
                    const star1 = stars[Math.floor(Math.random() * stars.length)];
                    const star2 = stars[Math.floor(Math.random() * stars.length)];
                    
                    if (star1 !== star2) {
                        const line = document.createElement('div');
                        line.classList.add('star-connection');
                        
                        const x1 = parseFloat(star1.style.left) + parseFloat(star1.style.width) / 2;
                        const y1 = parseFloat(star1.style.top) + parseFloat(star1.style.height) / 2;
                        const x2 = parseFloat(star2.style.left) + parseFloat(star2.style.width) / 2;
                        const y2 = parseFloat(star2.style.top) + parseFloat(star2.style.height) / 2;
                        
                        const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
                        
                        line.style.width = `${length}px`;
                        line.style.height = '1px';
                        line.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
                        line.style.position = 'absolute';
                        line.style.left = `${x1}px`;
                        line.style.top = `${y1}px`;
                        line.style.transformOrigin = '0 0';
                        line.style.transform = `rotate(${angle}deg)`;
                        line.style.animation = 'twinkle 2s infinite alternate';
                        line.style.animationDelay = `${Math.random() * 2}s`;
                        
                        container.appendChild(line);
                    }
                }
            }
            
            // Confeti
            function createConfetti() {
                for (let i = 0; i < 150; i++) {
                    const confetti = document.createElement('div');
                    confetti.classList.add('confetti');
                    confetti.style.left = Math.random() * 100 + 'vw';
                    confetti.style.animationDelay = Math.random() * 5 + 's';
                    confetti.style.backgroundColor = getRandomColor();
                    confetti.style.width = Math.random() * 12 + 6 + 'px';
                    confetti.style.height = Math.random() * 12 + 6 + 'px';
                    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => {
                        confetti.remove();
                    }, 5000);
                }
            }
            
            function getRandomColor() {
                const colors = ['#F2D5F2', '#ECBDF2', '#DCA7F2', '#BB94F2', '#8268A6', '#FFD1DC', '#FFECF1', '#FFF2F5'];
                return colors[Math.floor(Math.random() * colors.length)];
            }
            
            // Crear corazones continuamente
            setInterval(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.style.left = Math.random() * 100 + '%';
                heart.style.animationDelay = Math.random() * 8 + 's';
                document.querySelector('header').appendChild(heart);
                
                setTimeout(() => {
                    heart.remove();
                }, 9000);
            }, 800);
            
            // Inicializar constelación
            createConstellation();
        });