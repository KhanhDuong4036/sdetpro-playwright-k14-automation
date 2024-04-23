export async function scrollToBottom(page: Page, scrollPercentage: number) {
    await page.evaluate((scrollPercentage) => {
        window.scrollTo(0, scrollPercentage * document.body.scrollHeight);
    }, scrollPercentage);
}