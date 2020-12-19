(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
     http://qooxdoo.org
  
     Copyright:
       2008 Dihedrals.com, http://www.dihedrals.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Chris Banford (zermattchris)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class iterates over the lines in a flow layout.
   *
   * @internal
   */
  qx.Class.define("qx.ui.layout.LineSizeIterator", {
    extend: Object,

    /**
     * @param children {qx.ui.core.Widget[]} The children of the flow layout to
     *    compute the lines from
     * @param spacing {Integer} The horizontal spacing between the children
     */
    construct: function construct(children, spacing) {
      this.__children__P_439_0 = children;
      this.__spacing__P_439_1 = spacing;
      this.__hasMoreLines__P_439_2 = children.length > 0;
      this.__childIndex__P_439_3 = 0;
    },
    members: {
      __children__P_439_0: null,
      __spacing__P_439_1: null,
      __hasMoreLines__P_439_2: null,
      __childIndex__P_439_3: null,

      /**
       * Computes the properties of the next line taking the available width into
       * account
       *
       * @param availWidth {Integer} The available width for the next line
       * @return {Map} A map containing the line's properties.
       */
      computeNextLine: function computeNextLine(availWidth) {
        var availWidth = availWidth || Infinity;

        if (!this.__hasMoreLines__P_439_2) {
          throw new Error("No more lines to compute");
        }

        var children = this.__children__P_439_0;
        var lineHeight = 0;
        var lineWidth = 0;
        var lineChildren = [];
        var gapsBefore = [];

        for (var i = this.__childIndex__P_439_3; i < children.length; i++) {
          var child = children[i];
          var size = child.getSizeHint();

          var gapBefore = this.__computeGapBeforeChild__P_439_4(i);

          var childWidth = size.width + gapBefore;
          var isFirstChild = i == this.__childIndex__P_439_3;

          if (!isFirstChild && lineWidth + childWidth > availWidth) {
            this.__childIndex__P_439_3 = i;
            break;
          }

          var childHeight = size.height + child.getMarginTop() + child.getMarginBottom();
          lineChildren.push(child);
          gapsBefore.push(gapBefore);
          lineWidth += childWidth;
          lineHeight = Math.max(lineHeight, childHeight);

          if (child.getLayoutProperties().lineBreak) {
            this.__childIndex__P_439_3 = i + 1;
            break;
          }
        }

        if (i >= children.length) {
          this.__hasMoreLines__P_439_2 = false;
        }

        return {
          height: lineHeight,
          width: lineWidth,
          children: lineChildren,
          gapsBefore: gapsBefore
        };
      },

      /**
       * Computes the gap before the child at the given index
       *
       * @param childIndex {Integer} The index of the child widget
       * @return {Integer} The gap before the given child
       */
      __computeGapBeforeChild__P_439_4: function __computeGapBeforeChild__P_439_4(childIndex) {
        var isFirstInLine = childIndex == this.__childIndex__P_439_3;

        if (isFirstInLine) {
          return this.__children__P_439_0[childIndex].getMarginLeft();
        } else {
          return Math.max(this.__children__P_439_0[childIndex - 1].getMarginRight(), this.__children__P_439_0[childIndex].getMarginLeft(), this.__spacing__P_439_1);
        }
      },

      /**
       * Whether there are more lines
       *
       * @return {Boolean} Whether there are more lines
       */
      hasMoreLines: function hasMoreLines() {
        return this.__hasMoreLines__P_439_2;
      }
    }
  });
  qx.ui.layout.LineSizeIterator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LineSizeIterator.js.map?dt=1608415621830