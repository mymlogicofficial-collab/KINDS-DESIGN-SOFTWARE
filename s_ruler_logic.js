// SE CUSTOMS - S-RULER (DOUBLE HINGE) LOGIC
const SRuler = {
    // p0: Start (Fixed), p1: Hinge 1, p2: Hinge 2, p3: End Point
    calculateCurve: (p0, p1, p2, p3) => {
        const points = [];
        // t goes from 0 to 1 to plot the curve
        for (let t = 0; t <= 1; t += 0.01) {
            const x = Math.pow(1-t, 3)*p0.x + 3*Math.pow(1-t, 2)*t*p1.x + 3*(1-t)*Math.pow(t, 2)*p2.x + Math.pow(t, 3)*p3.x;
            const y = Math.pow(1-t, 3)*p0.y + 3*Math.pow(1-t, 2)*t*p1.y + 3*(1-t)*Math.pow(t, 2)*p2.y + Math.pow(t, 3)*p3.y;
            points.push({x, y});
        }
        return points; // This is your "S" path
    },

    drawSPath: (ctx, curvePoints) => {
        ctx.beginPath();
        ctx.moveTo(curvePoints[0].x, curvePoints[0].y);
        curvePoints.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = '#88CCFF'; // Abb's energy color
        ctx.stroke();
    }
};

export default SRuler;

