import { useRoutes } from 'react-router';
import routerConfig from './routes';
import { useEffect } from 'react';

import './App.css';

function App() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      let target = event.target as HTMLElement | null;
      // Поднимаемся по дереву, чтобы найти кнопку или элемент с role="button"
      while (target) {
        // Кнопки
        if (
          target.tagName === 'BUTTON' ||
          target.getAttribute('role') === 'button'
        ) {
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'button_click', {
              event_category: 'Button',
              event_label: target.innerText || target.getAttribute('aria-label') || '',
            });
          }
          break;
        }
        // Ссылки (в том числе Link из react-router)
        if (
          (target.tagName === 'A' && target.getAttribute('href')) ||
          target.getAttribute('role') === 'link'
        ) {
          if (typeof window.gtag === 'function') {
            window.gtag('event', 'link_click', {
              event_category: 'Link',
              event_label:
                target.innerText ||
                target.getAttribute('aria-label') ||
                target.getAttribute('href') ||
                '',
            });
          }
          break;
        }
        target = target.parentElement;
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const routes = useRoutes(routerConfig);
  return (
    <>
      <div>{routes}</div>
    </>
  );
}

export default App;
