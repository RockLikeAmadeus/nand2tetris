// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Fill.asm

// Runs an infinite loop that listens to the keyboard input.
// When a key is pressed (any key), the program blackens the screen,
// i.e. writes "black" in every pixel;
// the screen should remain fully black as long as the key is pressed. 
// When no key is pressed, the program clears the screen, i.e. writes
// "white" in every pixel;
// the screen should remain fully clear as long as no key is pressed.

// Put your code here.

// PSEUDO CODE FOLLOWS:

// LOOP:
//     key = KBD
//     if key == 0
//         // Make white
//         i=0
//         WHITELOOP:
//             SCREEN[i]=0
//             i = i+1
//             IF i < 131072 GOTO WHITELOOP
//         GOTO STARTOVER
//     KEYPRESSED:
//         // Make black
//         i=0
//         BLACKLOOP:
//             SCREEN[i]=-1
//             i = i+1
//             IF i < 131072 GOTO BLACKLOOP
// STARTOVER:
//     GOTO LOOP


@SCREEN
D=A
@8191
D=D+A
@max
M=D

(LOOP)
    // key = KBD
    @KBD
    D=M
    // if key != 0 GOTO KEYPRESSED
    @KEYPRESSED
    D;JNE
    // Make white:
        // i = 0
        @SCREEN
        D=A
        @i
        M=D
        
        (WHITELOOP)
            // SCREEN[i] = 0
            @i
            D=M
            A=D
            M=0
            // i = i + 1
            @i
            M=M+1
            // IF i <= 131072 GOTO WHITELOOP
            @i
            D=M
            @max
            D=D-M
            @WHITELOOP
            D;JLE
        // GOTO STARTOVER
        @STARTOVER
        0;JMP

    (KEYPRESSED)
    // Make black:
        // i = 0
        @SCREEN
        D=A
        @i
        M=D
        
        
        (BLACKLOOP)
            // SCREEN[i] = -1
            @i
            D=M
            A=D
            M=-1
            // i = i + 1
            @i
            M=M+1
            // IF i <= 131072 GOTO BLACKLOOP
            @i
            D=M
            @max
            D=D-M
            @BLACKLOOP
            D;JLE

// STARTOVER:
//     GOTO LOOP
(STARTOVER)
    @LOOP
    0;JMP

