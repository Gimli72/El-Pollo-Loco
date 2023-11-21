
/**
 * Generates a dialog template in HTML.
 * @returns {string} The HTML string for the dialog template.
 */
export function dialogTemplate() {
  return /*html*/ `
    <div class="dialog">
      <h2>Instruction</h2>
      <div>
        <div class="dialog_line">
          <img src="./img/0_icons/right.png" alt="Right Arrow Icon">
          <span>Move right</span>
        </div>
        <div class="dialog_line">
          <img src="./img/0_icons/left.png" alt="Left Arrow Icon">
          <span>Move left</span>
        </div>
        <div class="dialog_line">
          <img src="./img/0_icons/space.png" alt="Space Bar Icon">
          <span>Jump</span>
        </div>
        <div class="dialog_line">
          <img src="./img/0_icons/d-key.png" alt="D Key Icon">
          <span>Throw bottle</span>
        </div>
        <div class="dialog_line">
          <img src="./img/0_icons/w-key.png" alt="W Key Icon">
          <span>Fullscreen</span>
        </div>
      </div>
    </div>
    `;
}