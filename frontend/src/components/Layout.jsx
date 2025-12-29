import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
    // We can manage the main content margin based on sidebar state if needed,
    // but since the Sidebar manages its own width state internally (which might be tricky to sync),
    // a common pattern is to just reserve space for simple implementations or use context.
    // For this "ChatGPT-style" implementation, we'll assume the Sidebar component
    // pushes content or we leave a fixed margin.

    // To make it truly responsive to the sidebar's internal state without Context, 
    // we might need to lift the state up. Let's modify Sidebar to accept props or 
    // use a css variable/calc approach.

    // HOWEVER, for simplicity and speed:
    // We'll set a standard margin. If the user wants it to "resize accordingly",
    // we should lift the state. Let's do that for a better experience.

    const [isCollapsed, setIsCollapsed] = React.useState(false);

    // We need to pass these down to Sidebar if we want to control the layout width from here
    // But Sidebar has its own state in the previous file. 
    // Let's rewrite Sidebar slightly in the next step or just stick to a fixed margin 
    // that adapts to the "collapsed" width (w-20 vs w-64).

    // Actually, let's just use the Sidebar as is, but we need to know the width here.
    // I'll update Sidebar to accept `isCollapsed` and `toggleSidebar` as props 
    // so Layout can control the width of the main content.

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* We'll modify Sidebar to take props in a moment. For now, let's assume it does. 
                Wait, I just wrote Sidebar with internal state. 
                I will update Sidebar in the next step to lift state up.
            */}
            <Sidebar isCollapsed={isCollapsed} toggleSidebar={() => setIsCollapsed(!isCollapsed)} />

            <main
                className={`
                    flex-1 transition-all duration-300 ease-in-out
                    ${isCollapsed ? 'ml-20' : 'ml-64'}
                `}
            >
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
