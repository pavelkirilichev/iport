import { useState } from "react";
import { Link } from "react-router-dom";
import { catalog } from "../data/CatalogJSON";

function Catalog({
	setPull,
	pull,
	setCatalogChapter,
	catalogChapter,
	catalogMenuImgOne,
	setCatalogMenuImgOne,
	catalogMenuImgTwo,
	setCatalogMenuImgTwo,
	catalogMenuImgThree,
	setCatalogMenuImgThree,
	route,
	setChapterTkani,
	setCategory,
}) {
	return (
		<div className={"pull__main" + pull}>
			<div className='pull-menu'>
				<div className='pull-menu__list'>
					<span
						className='pull-menu__item'
						onClick={() => {
							if (catalogMenuImgOne == "") {
								setCatalogMenuImgOne(" pull-catalog-active");
								setCatalogMenuImgTwo(" pull-catalog-disable");
								setCatalogMenuImgThree(" pull-catalog-disable");
								setTimeout(() => {
									setCatalogMenuImgTwo("");
									setCatalogMenuImgThree("");
								}, 500);
							} else if (catalogMenuImgOne == " pull-catalog-active") {
								setCatalogMenuImgOne(" pull-catalog-disable");
								setTimeout(() => {
									setCatalogMenuImgOne("");
								}, 500);
							} else {
							}
						}}
					>
						Техника
					</span>
					<div className={"pull-catalog__list" + catalogMenuImgOne}>
						{catalog.map((catalogItem) => {
							return (
								<Link
									to={"/tkani"}
									state={{ chapter: "Техника", category: catalogItem.title }}
								>
									<div
										className='pull-catalog__item'
										onClick={() => {
											if (route == "tkani") {
												setChapterTkani("Спальня");
												setCategory(catalogItem.title);
												setPull("");
											}
										}}
									>
										<span> {catalogItem.title}</span>
									</div>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
			<div className='pull-catalog-bg'></div>
		</div>
	);
}

export default Catalog;
