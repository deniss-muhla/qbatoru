import jss from './jss';
import { render } from 'solid-js/dom';
import bunny from './bunny.png';

const styles = jss.createStyleSheet({
    '@global': {
        body: {
            backgroundColor: 'lightGray'
        }
    },
    helloMessage: {
        color: 'blue'
    }
});

styles.attach();

interface HelloMessageProps {
    name: string;
}

const HelloMessage = (props: HelloMessageProps) => (
    <div className={styles.classes.helloMessage}>
        Hello {props.name} <img src={bunny}></img>
    </div>
);

render(() => <HelloMessage name="World" />, document.getElementById('root') as HTMLElement);

if (process.env.NODE_ENV === 'production') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/service-worker.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}
