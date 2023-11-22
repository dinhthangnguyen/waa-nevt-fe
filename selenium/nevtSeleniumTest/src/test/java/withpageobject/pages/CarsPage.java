package withpageobject.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.openqa.selenium.support.ui.Select;

import java.util.List;
import java.util.function.Predicate;

public class CarsPage {
	protected WebDriver driver;

	public CarsPage(WebDriver driver) {
		this.driver = driver;
		PageFactory.initElements(driver,this);
	}


	public void open(String url) {
		driver.get(url);
	}

	public void close() {
		driver.close();
	}

	public WebElement getCarItem (String carName) {
		List<WebElement> allCars = driver.findElements(By.className("cartitem"));
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
		}).findFirst().get();
	}
}
