// This file is part of www.nand2tetris.org
// and the book "The Elements of Computing Systems"
// by Nisan and Schocken, MIT Press.
// File name: projects/04/Mult.asm

// Multiplies R0 and R1 and stores the result in R2.
// (R0, R1, R2 refer to RAM[0], RAM[1], and RAM[2], respectively.)

// Put your code here.

// PSEUDO CODE FOLLOWS:
// A more efficient implementation would figure out
// whether R0 or R1 is smaller, and use the smaller 
// variable as the loop variable

//     x = R0
//     y = R1
//     i = 0
//     R2 = 0
//
// LOOP:
//     if i == y GOTO DONE
// 
//     R2 = R2 + x
//     i = i + 1
//     GO TO LOOP
// 
// DONE:
//     GOTO DONE

// x = R0
    @R0
    D=M
    @x
    M=D
// y = R1
    @R1
    D=M
    @y
    M=D
// i = 0
    @i
    M=0
// R2 = 0
    @R2
    M=0

(LOOP)
// if i == y GOTO DONE
    @i
    D=M
    @y
    D=D-M
    @DONE
    D;JEQ

// R2 = R2 + x
    @x
    D=M
    @R2
    M=D+M
// i = i + 1
    @i
    M=M+1
// GOTO LOOP
    @LOOP
    0;JMP

(DONE)
    @DONE
    0;JMP