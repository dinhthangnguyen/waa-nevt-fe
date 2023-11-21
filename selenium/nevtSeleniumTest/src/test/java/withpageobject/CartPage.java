package withpageobject;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.Select;

public class CartPage {
	protected WebDriver driver;

	public CartPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	@FindBy(id = "addAddress")
	private WebElement button;

	@FindBy(id = "cartTitle")
	private WebElement cartTitle;

	@FindBy(id = "total")
	private WebElement totalElement;

	public String getTitle() {
		return cartTitle.getText();
	}

	public String getTotalPrice() {
		return totalElement.getText();
	}

	public AddressPage clickAddress() {
		button.click();
		return new AddressPage(driver);
	}
}
