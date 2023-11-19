/**
 * Guide to the in-game keyboard layout
 * @returns the html code
 */
export function dialogTemplate() {
    return /*html*/ `
    <div class="dialog">
      <h2>Instruction</h2>
      <div>
        <div class="dialog_line"><img src="./img/0_icons/right.png" alt=""><span>Move right</span></div>
        <div class="dialog_line"><img src="./img/0_icons/left.png" alt=""><span>Move left</span></div>
        <div class="dialog_line"><img src="./img/0_icons/space.png" alt=""><span>Jump</span></div>
        <div class="dialog_line"><img src="./img/0_icons/d-key.png" alt=""><span>Throw bottle</span></div>
        <div class="dialog_line"><img src="./img/0_icons/w-key.png" alt=""><span>Fullscreen</span></div>
      </div>
    </div>
    `;
}