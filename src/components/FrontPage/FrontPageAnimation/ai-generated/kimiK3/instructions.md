Create a standalone React application using the NextJS framework whose root can
be embedded into a larger site. This is a client-side component, so it will not
be rendered on the server. The component is an infinitely looping animation of a
character sitting at a desk and writing code. The animation should be done
programmatically, the component will not simply host a prerecorded video.

The animation should be composed of the following segments:
- The character reaches for the coffee mug, drinks the coffee, and places the
mug back on the desk in the same position
- The character reaches for the mouse and can move it up or down. The cursor on
the screen should follow the movement of the mouse.
- The character types on the keyboard to delete 1-5 lines of code (number
should be randomly chosen)
- The character types on the keyboard to add 1-5 lines of code (number should
be randomly chosen)
- The character types on the keyboard to edit parts of the code. In other word
, changing parts of the code.

Segments of the animation should be unpredictable, where the next segment to be
played is chosen at random.

The code on screen should have a blinking cursor that follows the movement of
the mouse and keyboard. Adding, deleting, and changing the contents of the
screen should have realistic cursor movements.

Use the contents of the `/static` folder to access the image files you need to
complete this project. The /examples folder has design screenshots of how the
animation should look. Use the values in code-colors.css to color the code on
the screen. If you get stuck, stop and ask me for additional context or skills
you may need.

The animation should be responsive to screen size. Less than 1,000px should use
the /static/background-mobile.png file, and /static/background-desktop.png file
for larger screens. If the user changes screen size by shrinking their browser
window, the animation should resize seamlessly without breaking the current
movement.

There should be no visible stitches in the animation. Keep track of the
position of the mouse, coffee mug, and code on screen to avoid any obvious
jumps in the images.

This is a visual project, so success can be difficult to measure in a
objective sense. When you think you've accomplished the task, ask me to check
the code and I will provide feedback.
