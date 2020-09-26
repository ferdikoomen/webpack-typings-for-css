import scssExample, { ClassName } from './styles.scss';
import lessExample from './styles.less';
import cssExample from './styles.css';

function testClassName(className: ClassName): void {
    console.log('className:', className);
}

console.log(scssExample.button);
console.log(scssExample.buttonSmall);
console.log(scssExample.buttonLarge);
console.log(scssExample.buttonWithCamelCaseName);

console.log(lessExample.button);
console.log(lessExample.buttonSmall);
console.log(lessExample.buttonLarge);
console.log(lessExample.buttonWithCamelCaseName);

console.log(cssExample.button);
console.log(cssExample.buttonSmall);
console.log(cssExample.buttonLarge);
console.log(cssExample.buttonWithCamelCaseName);

testClassName(scssExample.button);
testClassName(scssExample.buttonSmall);
testClassName(scssExample.buttonLarge);
testClassName(scssExample.buttonWithCamelCaseName);

console.log('Done!');
