export const pathFromBezierCurve = (cubicBezierCurve) => {
    const {
        initialAxis, initialControlPoint, endingControlPoint, endingAxis,
    } = cubicBezierCurve;
    
    return `
        M${initialAxis.x} ${initialAxis.y} 
        c ${initialControlPoint.x} ${initialControlPoint.y} 
        ${endingControlPoint.x} ${endingControlPoint.y}
        ${endingAxis.x} ${endingAxis.y}
    `;
};

export const radiansToDegrees = radians => ((radians * 180) / Math.PI);

export const calculateAngle = (x1, y1, x2, y2) => {
    if (x2 >= 0 && y2 >= 0) {
        return 90;
    } 
    else if (x2 < 0 && y2 >= 0) {
        return -90;
    }

    const dividend = x2 - x1;
    const divisor = y2 - y1; 
    const quotient = dividend / divisor;
    return radiansToDegrees(Math.atan(quotient)) * -1; 
};

export const getCanvasPosition = (event) => {
    const svg = document.getElementById('aliens-go-rumah-canvas');
    const point = svg.createSVGPoint();

    point.x = event.clientX; 
    point.y = event.clientY;
    const {x, y} = point.matrixTransform(svg.getScreenCTM().inverse());
    return {x, y};
};

const degreesToRadians = degrees => ((degrees * Math.PI) / 180);

export const calculateNextPosition = (x, y, angle, divisor = 300) => {
    const realAngle = (angle * -1) + 90;
    const stepsX = radiansToDegrees(Math.cos(degreesToRadians(realAngle))) / divisor;
    const stepsY = radiansToDegrees(Math.sin(degreesToRadians(realAngle))) / divisor;

    return {
        x: x + stepsX,
        y: y - stepsY,
    }
}