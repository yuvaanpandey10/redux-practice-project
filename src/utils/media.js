export const extFor = (item) =>
  item.type === "video" ? "mp4" : item.type === "gif" ? "gif" : "jpg";
 
export const badgeStyles = {
  photo: "bg-blue-500/90",
  video: "bg-red-500/90",
  gif: "bg-green-600/90",
};
 
export async function downloadItem(item) {
  try {
    const res = await fetch(item.src);
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${item.type}-${item.id}.${extFor(item)}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch {
    window.open(item.src, "_blank", "noopener,noreferrer");
  }
}