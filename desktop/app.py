from PyQt6.QtWidgets import (
    QApplication,
    QMainWindow,
    QVBoxLayout,
    QWidget,
    QLabel
)
from PyQt6.QtGui import QPixmap, QFont
import sys
import xml.dom.minidom as MiniDom
import os


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.widgets = []
        # self.render()

    def render(self):
        self.setWindowTitle("Widgets App")

        layout = QVBoxLayout()

        for w in self.widgets:
            layout.addWidget(w)

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)


app = QApplication(sys.argv)
window = MainWindow()


tree = MiniDom.parse(os.path.join(os.getcwd(), "index.xml"))
root = tree.getElementsByTagName("index")[0]
for a in root.childNodes:
    if a.nodeType != MiniDom.Node.ELEMENT_NODE:
        continue
    text_content = ""
    if a.firstChild and a.firstChild.nodeType == MiniDom.Node.TEXT_NODE:
        text_content = a.firstChild.data.strip()
    match a.tagName.lower():
        case "text":
            size_attr = a.getAttribute("size")
            font_size = int(size_attr) if size_attr else 20
            font = QFont(a.getAttribute("font") or "Arial", font_size)
            label = QLabel(text_content)
            label.setFont(font)
            window.widgets.append(label)
        case "image":
            if text_content and os.path.exists(text_content):
                Z = QLabel()
                Z.setPixmap(QPixmap(text_content))
                window.widgets.append(Z)

window.render()
window.show()
sys.exit(app.exec())
