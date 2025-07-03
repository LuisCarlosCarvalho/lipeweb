// PWA Installation and Service Worker Registration
class PWAManager {
  constructor() {
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    this.registerServiceWorker();
    this.setupInstallPrompt();
    this.createInstallButton();
  }

  // Register Service Worker
  async registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered successfully:', registration);
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              this.showUpdateNotification();
            }
          });
        });
      } catch (error) {
        console.log('Service Worker registration failed:', error);
      }
    }
  }

  // Setup install prompt
  setupInstallPrompt() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.hideInstallButton();
      this.showInstalledNotification();
    });
  }

  // Create install button
  createInstallButton() {
    const installButton = document.createElement('button');
    installButton.id = 'install-button';
    installButton.innerHTML = `
      <i class="fas fa-download"></i>
      <span>Instalar App</span>
    `;
    installButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #FFD700, #FFA500);
      color: #000;
      border: none;
      padding: 12px 20px;
      border-radius: 25px;
      font-weight: bold;
      font-size: 14px;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
      z-index: 1000;
      display: none;
      align-items: center;
      gap: 8px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
    `;

    installButton.addEventListener('mouseenter', () => {
      installButton.style.transform = 'translateY(-2px)';
      installButton.style.boxShadow = '0 6px 20px rgba(255, 215, 0, 0.4)';
    });

    installButton.addEventListener('mouseleave', () => {
      installButton.style.transform = 'translateY(0)';
      installButton.style.boxShadow = '0 4px 15px rgba(255, 215, 0, 0.3)';
    });

    installButton.addEventListener('click', () => {
      this.installApp();
    });

    document.body.appendChild(installButton);
  }

  // Show install button
  showInstallButton() {
    const button = document.getElementById('install-button');
    if (button) {
      button.style.display = 'flex';
      setTimeout(() => {
        button.style.opacity = '1';
        button.style.transform = 'translateY(0)';
      }, 100);
    }
  }

  // Hide install button
  hideInstallButton() {
    const button = document.getElementById('install-button');
    if (button) {
      button.style.opacity = '0';
      button.style.transform = 'translateY(20px)';
      setTimeout(() => {
        button.style.display = 'none';
      }, 300);
    }
  }

  // Install app
  async installApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const { outcome } = await this.deferredPrompt.userChoice;
      
      if (outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      
      this.deferredPrompt = null;
      this.hideInstallButton();
    }
  }

  // Show update notification
  showUpdateNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: #000;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        max-width: 300px;
        font-weight: 500;
      ">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
          <i class="fas fa-sync-alt"></i>
          <span>Nova versão disponível!</span>
        </div>
        <button onclick="window.location.reload()" style="
          background: #000;
          color: #FFD700;
          border: none;
          padding: 8px 15px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        ">Atualizar</button>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 10000);
  }

  // Show installed notification
  showInstalledNotification() {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #28a745, #20c997);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        max-width: 300px;
        font-weight: 500;
      ">
        <div style="display: flex; align-items: center; gap: 10px;">
          <i class="fas fa-check-circle"></i>
          <span>App instalado com sucesso!</span>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  }
}

// Initialize PWA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PWAManager();
});