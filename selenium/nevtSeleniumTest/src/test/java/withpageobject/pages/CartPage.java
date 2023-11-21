package withpageobject.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import java.util.List;
import java.util.Optional;
import java.util.function.Predicate;

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

	public Optional<WebElement> getCartItem (String carName) {
		List<WebElement> allOrderCells = driver.findElements(By.className("cartitem"));
		System.out.println("orders: "+ allOrderCells.size());
		return allOrderCells.stream().filter(new Predicate<WebElement>() {
			@Override
			public boolean test(WebElement webElement) {
				WebElement totalElement = webElement.findElement(By.name("cartTitle"));
				System.out.println(totalElement.isDisplayed());
				if (totalElement.getText().contains(carName)) {
					return true;
				}
				return false;
			}
		}).findFirst();
	}

	public void deleteCartItem (String carName) {
		Optional<WebElement> optional = getCartItem(carName);
		if (optional.isPresent()) {
			WebElement carElement = optional.get();
			WebElement delete = carElement.findElement(By.id("cartCellDelete"));
			delete.click();
		}

	}
}
