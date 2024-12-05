// Variables pour suivre l'état des paramètres
let state = {
    elaborate: 0,
    funny: 0,
    spicy: 0,
    size: 'medium' // nouvelle variable pour la taille
};

// Tableau pour suivre l'ordre des smileys (peut contenir plusieurs fois le même type)
let smileyOrder = [];

// Chemins des images
const basePath = "images";
const imagePaths = {
    elaborate: [`${basePath}/elaborate/b-elaborate-1.png`, `${basePath}/elaborate/b-elaborate-2.png`, `${basePath}/elaborate/b-elaborate-3.png`],
    funny: [`${basePath}/funny/c-funny-1.png`, `${basePath}/funny/c-funny-2.png`, `${basePath}/funny/c-funny-3.png`],
    spicy: [`${basePath}/spicy/a-spicy-1.png`, `${basePath}/spicy/a-spicy-2.png`, `${basePath}/spicy/a-spicy-3.png`]
};

// Emojis correspondants
const emojis = {
    elaborate: '🎨',
    funny: '😄',
    spicy: '🌶️'
};

// Configuration des tailles
const sizes = ['small', 'medium', 'large'];
const sizeEmojis = {
    small: '☕',
    medium: '☕☕',
    large: '☕☕☕'
};

// Fonction pour mettre à jour l'affichage des images
function updateImages(type) {
    const layer = document.getElementById(`${type}-layer`);
    if (state[type] === 0) {
        layer.src = '';
        layer.style.display = 'none';
    } else {
        layer.src = imagePaths[type][state[type] - 1];
        layer.style.display = 'block';
    }
}

// Fonction pour mettre à jour les emojis sélectionnés
function updateSelectedEmojis() {
    const container = document.getElementById('selected-emojis');
    container.innerHTML = '';
    
    // Créer un emoji pour chaque élément dans smileyOrder
    smileyOrder.forEach(type => {
        const emojiSpan = document.createElement('span');
        emojiSpan.className = 'emoji';
        emojiSpan.textContent = emojis[type];
        container.appendChild(emojiSpan);
    });
}

// Fonction pour vider la sélection
function clearSelection() {
    smileyOrder = [];
    Object.keys(state).forEach(key => {
        if (key !== 'size') {
            state[key] = 0;
            updateImages(key);
        }
    });
    updateSelectedEmojis();
}

// Fonction pour changer la taille
function cycleSize() {
    const currentIndex = sizes.indexOf(state.size);
    const nextIndex = (currentIndex + 1) % sizes.length;
    state.size = sizes[nextIndex];
    
    const smileyContainer = document.getElementById('smiley-container');
    smileyContainer.classList.remove(...sizes.map(s => `size-${s}`));
    smileyContainer.classList.add(`size-${state.size}`);
    
    const sizeBtn = document.getElementById('size-btn');
    sizeBtn.textContent = `Size: ${state.size.charAt(0).toUpperCase() + state.size.slice(1)} ${sizeEmojis[state.size]}`;
}

// Gestionnaire de clic pour les boutons
function handleButtonClick(type) {
    // Si nous avons déjà 3 smileys au total, retirons le plus ancien
    if (smileyOrder.length >= 3) {
        const removedType = smileyOrder.shift();
        // Réduire le paramètre correspondant lorsque l'emoji est retiré
        state[removedType] = Math.max(0, state[removedType] - 1);
        updateImages(removedType);
    }
    
    // Ajoute le nouveau type
    smileyOrder.push(type);
    
    // Compte combien de fois ce type apparaît dans smileyOrder
    const typeCount = smileyOrder.filter(t => t === type).length;
    state[type] = typeCount; // L'état reflète maintenant le nombre d'emojis de ce type
    
    updateImages(type);
    updateSelectedEmojis();
}

// Configuration des écouteurs d'événements
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('elaborate-btn').addEventListener('click', () => handleButtonClick('elaborate'));
    document.getElementById('funny-btn').addEventListener('click', () => handleButtonClick('funny'));
    document.getElementById('spicy-btn').addEventListener('click', () => handleButtonClick('spicy'));
    document.getElementById('clear-btn').addEventListener('click', clearSelection);
    document.getElementById('size-btn').addEventListener('click', cycleSize);
});
